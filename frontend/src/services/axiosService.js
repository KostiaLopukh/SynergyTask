import axios from "axios";
import {constants} from '../constants/constants';

const {baseURL} = constants;

export const axiosService = axios.create({
    baseURL
})
