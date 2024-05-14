import { useState } from 'react';
import imageDefault from '../assets/profileDefault.png';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';

export default function Profile() {
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [enableFields, setEnableFields] = useState(false);

    return (
        <section className='h-screen w-screen bg-gray-100 flex justify-center'>
            <div className='container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700'>
                <div className='w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg'>
                    <img className='p-4' src={imageDefault} alt='Default picture' width={100} />
                    <div className='flex justify-between'>
                        <span className='text-xl font-semibold block'>
                            <strong>{user?.role_name.toUpperCase()}</strong> Profile
                        </span>
                        <button
                            onClick={() => setEnableFields(true)}
                            className='-mt-2 text-md font-bold text-white bg-gray-700 rounded-lg px-5 py-2 hover:bg-gray-800'
                        >
                            Edit
                        </button>
                    </div>

                    <span className='text-gray-600'>This information is secret so be careful</span>
                    <div className='w-full p-8 mx-2 flex justify-center'></div>
                </div>

                <div className='w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md rounded-lg'>
                    <div className='pb-6'>
                        <label htmlFor='name' className='font-semibold text-gray-700 block pb-1'>
                            Name
                        </label>
                        <div className='flex'>
                            <input
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: 'Please fill the blank',
                                    },
                                })}
                                disabled={!enableFields}
                                id='name'
                                name='name'
                                value={user?.name}
                                className={`border-1 bg-gray-50 rounded-lg ${
                                    enableFields ? 'text-slate-950' : 'text-slate-400'
                                } rounded-r px-4 py-2 w-full`}
                                type='text'
                            />
                        </div>
                    </div>
                    <div className='pb-6'>
                        <label htmlFor='lastName' className='font-semibold text-gray-700 block pb-1'>
                            Last Name
                        </label>
                        <div className='flex'>
                            <input
                                {...register('userName', {
                                    required: {
                                        value: true,
                                        message: 'Please fill the blank',
                                    },
                                })}
                                disabled={!enableFields}
                                id='lastName'
                                name='userName'
                                value={user?.lastName}
                                className={`border-1 bg-gray-50 rounded-lg ${
                                    enableFields ? 'text-slate-950' : 'text-slate-400'
                                } rounded-r px-4 py-2 w-full`}
                                type='text'
                            />
                        </div>
                    </div>
                    <div className='pb-6'>
                        <label htmlFor='userName' className='font-semibold text-gray-700 block pb-1'>
                            User Name
                        </label>
                        <div className='flex'>
                            <input
                                {...register('userName', {
                                    required: {
                                        value: true,
                                        message: 'Please fill the blank',
                                    },
                                })}
                                disabled={!enableFields}
                                id='userName'
                                name='userName'
                                value={user?.userName}
                                className={`border-1 bg-gray-50 rounded-lg ${
                                    enableFields ? 'text-slate-950' : 'text-slate-400'
                                } rounded-r px-4 py-2 w-full`}
                                type='text'
                            />
                        </div>
                    </div>
                    <div className='pb-4'>
                        <label htmlFor='email' className='font-semibold text-gray-700 block pb-1'>
                            Email
                        </label>
                        <input
                            disabled={!enableFields}
                            id='email'
                            className={`border-1 bg-gray-50 rounded-lg ${
                                enableFields ? 'text-slate-950' : 'text-slate-400'
                            } rounded-r px-4 py-2 w-full`}
                            type='email'
                            value={user?.email}
                        />
                        <span className='text-gray-600 pt-4 block opacity-70'>Personal login information of your account</span>
                    </div>
                    {enableFields && (
                        <div className='flex gap-x-1'>
                            <button
                                onClick={() => setEnableFields(true)}
                                className='mt-2 text-md font-bold text-white bg-blue-500 rounded-lg px-5 py-2 hover:bg-blue-600'
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setEnableFields(false)}
                                className='mt-2 text-md font-bold text-white bg-gray-500 rounded-lg px-5 py-2 hover:bg-gray-600'
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
