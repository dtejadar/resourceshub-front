export default function ResourceCard({ resource, deleteResource, handleResourceForm, handleDataToEdit }) {
    return (
        <div className='p-4 flex-1 bg-slate-200 rounded-lg flex flex-col gap-4 justify-between align-middle overflow-hidden'>
            <h3 className='text-center'>{resource.name}</h3>

            <div className='bg-white rounded-lg p-4 overflow-hidden'>
                <div className='flex justify-center p-2 bg-slate-100 rounded-lg m-2'>
                    <h4>{resource.link}</h4>
                </div>

                <p className='text-center'>{resource.description}</p>
            </div>

            <div className='flex gap-4 justify-center align-bottom'>
                <button
                    onClick={() => {
                        handleDataToEdit(resource);
                        handleResourceForm(true);
                    }}
                    className='p-2 bg-blue-300 rounded-lg'
                >
                    Editar
                </button>
                <button onClick={() => deleteResource(resource.id)} className='p-2 bg-red-300 rounded-lg'>
                    Eliminar
                </button>
            </div>
        </div>
    );
}
