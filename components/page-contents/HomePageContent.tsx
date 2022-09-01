import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { object, string, date } from 'yup'

import type { SubmitHandler } from 'react-hook-form'
import type { InferType } from 'yup'

const schema = object({
  name: string().required('Name is required').min(3, 'Name is too short'),
  surname: string().required('Surname is required').min(3, 'Surname is too short'),
  birthDate: date().notRequired(),
  email: string().required('Email is required').email('Invalid email address'),
  gender: string().notRequired().nullable()
})

type FormValues = InferType<typeof schema>

export const HomePageContent = () => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormValues>({ resolver: yupResolver(schema), reValidateMode: 'onSubmit' })

  const onSubmit: SubmitHandler<FormValues> = ({ birthDate, email, gender, name, surname }) => {
    console.log({ birthDate, email, gender, name, surname })
    console.log('X')
  }

  console.log(errors)
  return (
    <main className='h-screen flex justify-center items-center'>
      <form className='max-w-md w-full mx-auto mt-8 mb-0 space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='relative'>
          <label className='sr-only' htmlFor='name'>
            Name
          </label>
          <input
            className='w-full py-3 pl-3 pr-12 text-sm border-2 border-gray-200 rounded'
            placeholder='Name'
            {...register('name')}
          />
        </div>

        {errors.name && <p className='text-red-800'>{errors.name.message}</p>}

        <div className='relative'>
          <label className='sr-only'>Surname</label>
          <input
            className='w-full py-3 pl-3 pr-12 text-sm border-2 border-gray-200 rounded'
            placeholder='Surname'
            {...register('surname')}
          />
        </div>

        {errors.surname && <p className='text-red-800'>{errors.surname.message}</p>}

        <div className='relative'>
          <label className='sr-only'>Email</label>
          <input
            type='email'
            className='w-full py-3 pl-3 pr-12 text-sm border-2 border-gray-200 rounded'
            placeholder='Email'
            {...register('email')}
          />
        </div>

        {errors.email && <p className='text-red-800'>{errors.email.message}</p>}

        <div className='relative'>
          <label className='sr-only'>Birth date</label>
          <input
            type='date'
            defaultValue='2000-01-01'
            min='1900-01-01'
            className='w-full py-3 pl-3 pr-12 text-sm border-2 border-gray-200 rounded'
            placeholder='Birth date'
            {...register('birthDate')}
          />
        </div>

        {errors.birthDate && <p className='text-red-800'>{errors.birthDate.message}</p>}

        <div className='form-control flex justify-center gap-5'>
          <label className='cursor-pointer label'>
            <span className='label-text'>Male</span>
            <input type='radio' value='male' className='checkbox checkbox-accent' {...register('gender')} />
          </label>
          <label className='cursor-pointer label flex gap-2'>
            <span className='label-text'>Female</span>
            <input type='radio' value='female' className='checkbox checkbox-accent' {...register('gender')} />
          </label>
        </div>

        <button className='btn btn-outline' type='submit'>
          Sign up
        </button>
      </form>
    </main>
  )
}
