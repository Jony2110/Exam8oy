import { createStore } from 'redux';
import rootReducer from './reducers'; // убедитесь, что путь к вашему редюсеру правильный

// Создание Redux хранилища
const store = createStore(rootReducer);

// Экспорт по умолчанию
export default store;