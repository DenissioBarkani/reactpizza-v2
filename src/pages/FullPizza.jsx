import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
    const [pizza, setPizza] = React.useState();
    const { id } = useParams();
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizzas() {
            try {
                const { data } = await axios.get(
                    `https://682e1ef0746f8ca4a47bf828.mockapi.io/items/${id}`,
                );
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении поццы!');
                navigate('/')
            }
        }
        fetchPizzas();
    }, [id]);
    console.log(pizza);

    if (!pizza) {
        return 'Загрузка...';
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis perspiciatis ut
                voluptas quo dicta porro. Deserunt, assumenda? Suscipit saepe veniam, officia
                incidunt voluptas iure expedita rerum natus nemo mollitia tempore.
            </p>
        </div>
    );
};
export default FullPizza;
