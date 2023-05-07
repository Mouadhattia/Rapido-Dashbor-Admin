import {FC, useMemo, useState} from 'react'
import * as Yup from 'yup'
import {useFormik, yupToFormErrors} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser, uploadImage} from '../core/_requests'
import {useQueryCatResponseData, useQueryResponse} from '../core/QueryResponseProvider'
import MyMap from './Map'

type Props = {
  isUserLoading: boolean
  user: User
}

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),

  location: Yup.object({
    lat: Yup.number().required('Latitude is required'),
    long: Yup.number().required('Longitude is required'),
  }),
})

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const imagePath = process.env.REACT_APP_IMAGE_URL
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit, setUserForEdit] = useState<User>({
    ...user,
    name: user.name || initialUser.name,
    catName: user.catName || initialUser.catName,
    img: user.img || initialUser.img,
    priority: user.priority || initialUser.priority,
    rate: user.rate || initialUser.rate,
  })
  //upload image
  const handleChange = async (event: any) => {
    const formData = new FormData()
    formData.append('image', event.target.files[0])
    uploadImage(formData).then(() =>
      setUserForEdit({...userForEdit, img: `${imagePath}/${event.target.files[0].name}`})
    )

    formik.setFieldValue('img', `${imagePath}/${event.target.files[0].name}`)
  }
  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  const userAvatarImg = toAbsoluteUrl(`/media/${userForEdit.img}`)

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          await updateUser(values)
        } else {
          await createUser(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  const cats = useQueryCatResponseData()

  const data = useMemo(() => cats, [cats])

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit}>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='d-block fw-bold fs-6 mb-5'>image</label>
            {/* end::Label */}

            {/* begin::Image input */}
            <div
              className='image-input image-input-outline'
              data-kt-image-input='true'
              style={{backgroundImage: `url('${userForEdit.img}')`}}
            >
              {/* begin::Preview existing avatar */}
              <div
                className='image-input-wrapper w-125px h-125px'
                style={{backgroundImage: `url('${userForEdit.img}')`}}
              ></div>
              {/* end::Preview existing avatar */}

              {/* begin::Label */}
              <label
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='change'
                data-bs-toggle='tooltip'
                title='Change avatar'
              >
                <i className='bi bi-pencil-fill fs-7'></i>

                <input
                  type='file'
                  name='img'
                  accept='.png, .jpg, .jpeg'
                  onChange={(event) => handleChange(event)}
                />
                <input type='hidden' name='avatar_remove' />
              </label>
              {/* end::Label */}

              {/* begin::Cancel */}
              <span
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='cancel'
                data-bs-toggle='tooltip'
                title='Cancel avatar'
              >
                <i className='bi bi-x fs-2'></i>
              </span>
              {/* end::Cancel */}

              {/* begin::Remove */}
              <span
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='remove'
                data-bs-toggle='tooltip'
                title='Remove avatar'
              >
                <i className='bi bi-x fs-2'></i>
              </span>
              {/* end::Remove */}
            </div>
            {/* end::Image input */}

            {/* begin::Hint */}
            <div className='form-text'>Types de fichiers autorisés : png, jpg, jpeg.</div>
            {/* end::Hint */}
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Non</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='name'
              {...formik.getFieldProps('name')}
              type='text'
              name='name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.name && formik.errors.name},
                {
                  'is-valid': formik.touched.name && !formik.errors.name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.name && formik.errors.name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.name}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          {/* end::Input group */}
          {/* <MyMap /> */}

          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Priorité</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='priority'
              {...formik.getFieldProps('priority')}
              type='number'
              name='priority'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.priority && formik.errors.priority},
                {
                  'is-valid': formik.touched.priority && !formik.errors.priority,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.priority && formik.errors.priority && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.priority}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Lat</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='lat'
              {...formik.getFieldProps('location.lat')}
              type='number'
              name='location.lat'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.priority && formik.errors.location},
                {
                  'is-valid': formik.touched.priority && !formik.errors.location,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />

            {/* end::Input */}
          </div>
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Long</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='long'
              {...formik.getFieldProps('location.long')}
              type='number'
              name='location.long'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.location && formik.errors.location},
                {
                  'is-valid': formik.touched.location && !formik.errors.location,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.location && formik.errors.location && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.name}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          {/* begin  sletct cat */}
          <div className='fv-row mb-7'>
            <select
              className='form-select form-select-solid'
              aria-label='Select example'
              value={userForEdit.catName}
              onChange={(e) => {
                formik.setFieldValue('catName', e.target.value)
                setUserForEdit({...userForEdit, catName: e.target.value})
              }}
              name='catName'
            >
              <option value='select'>sélectionner une catégorie</option>
              {data?.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* end selcet cat */}
          {/* end::Input group */}
          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Rate</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='rate'
              {...formik.getFieldProps('rate')}
              type='number'
              name='rate'
              className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />

            {/* end::Input */}
          </div>
          {/* end::Input group */}

          {/* end::Input group */}
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Annuler
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Confirmer</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                S'il vous plaît, attendez...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
