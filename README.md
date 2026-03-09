Para correr la aplicacion:

npm install
npm run dev 

Para correr los tests:
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest

Parrafo: 
La idea fue tener un proveedor de contexto que envuelve a todos los componentes tal que ese hace fetch sobre el back proporcionado y alli se almacena la lista de autores. Asi mismo, este proveedor expone funciones para que los componentes puedan manipular la lista de autores. Respecto al filtrado, se añadio un parametro de filtro en la parte donde se renderiza la lista y se hizo de tal forma que cada vez que se interactue con el elemento de busqueda se aplique un filtro diferente sobre la lista de autores. 
