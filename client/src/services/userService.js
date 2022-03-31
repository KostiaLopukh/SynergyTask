import {axiosService} from "./axiosService";

export const userService = {
    getAll: () => axiosService.get('/users'),
    deleteById: (id) => axiosService.delete(`/users/${id}`),
    create:(emailToCreate, groupIdToCreate)=>axiosService.post('/users', {emailToCreate, groupIdToCreate}),
    updateAdminStatus: (id, isAdmin) => axiosService.patch(`/users/${id}`, {isAdmin}),
    update: ({id, email, groupId}) => axiosService.put(`/users/${id}`, {email, groupId}),
}
