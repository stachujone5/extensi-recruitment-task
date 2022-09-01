import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { object, string, date } from 'yup'

import { Alert } from './components/Alert'
import { useCooldown } from './hooks/useCooldown'

import type { SubmitHandler } from 'react-hook-form'
import type { InferType } from 'yup'

interface ApiResponse {
  readonly email: string
  readonly status: number
  readonly status_message: 'Valid' | 'Invalid'
  readonly validation_status: boolean
}

const schema = object({
  name: string().required('Name is required').min(3, 'Name is too short'),
  surname: string().required('Surname is required').min(3, 'Surname is too short'),
  birthDate: date().required(),
  email: string()
    .required('Email is required')
    .test('Validation on server', 'Email is invalid', async value => {
      try {
        const { data } = await axios.get<ApiResponse>(`/api/email-validator.php?email=${value}`)
        return data.validation_status
      } catch {
        return false
      }
    }),
  gender: string().notRequired().nullable()
})

type FormValues = InferType<typeof schema>

export const App = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<FormValues>({ resolver: yupResolver(schema), mode: 'all' })

  const [isCooldown, setIsCooldown] = useCooldown()

  const onSubmit: SubmitHandler<FormValues> = ({ birthDate, email, gender, name, surname }) => {
    reset()
    alert(
      `Name: ${name}, Surname: ${surname}, Email: ${email}, birthDate: ${birthDate?.toDateString()}, Gender: ${
        gender ?? 'Not specified'
      }`
    )
    setIsCooldown()
  }

  return (
    <main className='h-screen flex flex-col justify-center items-center'>
      {isCooldown && <Alert className='absolute top-20 r-50 max-w-xs'>Form submitted!</Alert>}
      <form
        className='max-w-md w-full mx-auto mt-8 mb-0 space-y-4 flex flex-col items-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Name</span>
          </label>
          <input
            type='text'
            placeholder='Enter your name'
            className='input input-bordered w-full max-w-xs'
            {...register('name')}
          />
        </div>

        {errors.name && <p className='text-red-400'>{errors.name.message}</p>}
        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Surname</span>
          </label>
          <input
            type='text'
            placeholder='Enter your surname'
            className='input input-bordered w-full max-w-xs'
            {...register('surname')}
          />
        </div>

        {errors.surname && <p className='text-red-400'>{errors.surname.message}</p>}
        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Email</span>
          </label>
          <input
            type='email'
            placeholder='Enter your email'
            className='input input-bordered w-full max-w-xs'
            {...register('email')}
          />
        </div>

        {errors.email && <p className='text-red-400'>{errors.email.message}</p>}
        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Birthdate</span>
          </label>
          <input
            type='date'
            placeholder='Enter your birth date'
            className='input input-bordered w-full max-w-xs'
            min='1900-01-01'
            max={`${new Date().getFullYear()}-01-01`}
            {...register('birthDate')}
          />
        </div>

        <div className='form-control w-full max-w-xs flex justify-center gap-5'>
          <label className='cursor-pointer label'>
            <span className='label-text'>Male</span>
            <input type='radio' value='male' className='checkbox checkbox-accent' {...register('gender')} />
          </label>
          <label className='cursor-pointer label flex gap-2'>
            <span className='label-text'>Female</span>
            <input type='radio' value='female' className='checkbox checkbox-accent' {...register('gender')} />
          </label>
        </div>

        <button className='btn btn-outline block w-full max-w-xs' type='submit'>
          Submit
        </button>
      </form>
    </main>
  )
}
