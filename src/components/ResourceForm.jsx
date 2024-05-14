import { useForm } from 'react-hook-form';

const ResourceForm = ({ addNewResource, handleResourceForm, dataToEdit, handleDataToEdit, editResource }) => {
    const { register, handleSubmit, reset } = useForm({ defaultValues: dataToEdit ?? {} });

    const submitForm = (data) => {
        if (dataToEdit) {
            editResource(data);
        } else {
            addNewResource(data);
        }
        reset();
        handleResourceForm(false);
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white w-7/12 p-8 rounded-lg shadow-md'>
                <h2 className='text-lg font-bold mb-4'>Crear Nuevo Recurso</h2>
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className='mb-4'>
                        <label htmlFor='name' className='block text-sm font-bold mb-2'>
                            Nombre
                        </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            {...register('name', { required: true })}
                            className='w-full px-3 py-2 border rounded-md'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='link' className='block text-sm font-bold mb-2'>
                            URL
                        </label>
                        <input
                            type='text'
                            id='link'
                            name='link'
                            {...register('link', { required: true })}
                            className='w-full px-3 py-2 border rounded-md'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='description' className='block text-sm font-bold mb-2'>
                            Descripción
                        </label>
                        <textarea
                            id='description'
                            name='description'
                            {...register('description', { required: false })}
                            className='w-full px-3 py-2 border rounded-md'
                        />
                    </div>

                    <div className='text-right'>
                        <button
                            type='button'
                            className='mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
                            onClick={() => {
                                handleDataToEdit(null);
                                handleResourceForm(false);
                            }}
                        >
                            Cancelar
                        </button>
                        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                            {dataToEdit ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResourceForm;
