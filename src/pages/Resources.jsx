import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import ResourceCard from '../components/ResourceCard';
import ResourceForm from '../components/ResourceForm';

export default function Resources() {
    const { accessToken, validateAccessToken, user } = useAuth();

    const [resources, setResources] = useState(null);
    const [resourceEdit, setResourceEdit] = useState(null);
    const [resourceFormActive, setResourceFormActive] = useState(false);

    const requestConfig = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    useEffect(() => {
        const fetchResources = async () => {
            validateAccessToken(); //If accestoken is not valid it will be renewed
            const resourcesResponse = await axios.get('http://localhost:3030/resources', requestConfig);
            setResources(resourcesResponse.data.data);
        };

        if (!resources && accessToken) {
            fetchResources();
        }
    }, [accessToken]);

    const deleteResource = async (id) => {
        try {
            validateAccessToken(); //If accestoken is not valid it will be renewed
            const deleteResourceResponse = await axios.delete(`http://localhost:3030/resources/${id}`, requestConfig);

            if (deleteResourceResponse.status) {
                setResources(resources.filter((resource) => resource.id !== id));
                return;
            }
        } catch {
            alert('Ha ocurrido un error al momento de eliminar el recurso, por favor intentalo de nuevo');
        }
    };

    const handleResourceForm = (boolean) => {
        setResourceFormActive(boolean);
    };

    const addNewResource = async (data) => {
        data.user_id = user.id;

        try {
            validateAccessToken(); //If accestoken is not valid it will be renewed
            const addResourceResponse = await axios.post(`http://localhost:3030/resources`, data, requestConfig);

            if (addResourceResponse.status === 200) {
                alert('Recurso añadido con éxito');
                setResources((prev) => [...prev, addResourceResponse.data.data]);
                return;
            }
        } catch (error) {
            alert('Ha ocurrido un error en la creación del recurso');
            console.log(error);
        }
    };

    const handleDataToEdit = (data) => {
        setResourceEdit(data);
    };

    const editResource = async (data) => {
        try {
            validateAccessToken(); //If accestoken is not valid it will be renewed
            const addResourceResponse = await axios.put(`http://localhost:3030/resources/${data.id}`, data, requestConfig);

            if (addResourceResponse.status === 200) {
                alert('Recurso actualizado con éxito');
                setResources(
                    resources.map((resource) => {
                        if (resource.id === data.id) {
                            resource = data;
                        }
                        return resource;
                    })
                );
                setResourceEdit(null);
            }
        } catch (error) {
            alert('Ha ocurrido un error en la actualización del recurso');
            console.log(error);
        }
    };

    return (
        <section className='w-4/5 m-auto py-10 grid grid-cols-3 gap-8 relative'>
            {resourceFormActive && (
                <ResourceForm
                    handleResourceForm={handleResourceForm}
                    addNewResource={addNewResource}
                    dataToEdit={resourceEdit}
                    handleDataToEdit={handleDataToEdit}
                    editResource={editResource}
                />
            )}

            <button onClick={() => handleResourceForm(true)} className='bg-slate-50 rounded-lg flex-1 '>
                Agregar nuevo recurso +
            </button>
            {resources &&
                resources.map((resource) => (
                    <ResourceCard
                        key={resource.id}
                        resource={resource}
                        deleteResource={deleteResource}
                        handleResourceForm={handleResourceForm}
                        handleDataToEdit={handleDataToEdit}
                    />
                ))}
        </section>
    );
}
