import {api} from 'boot/axios';
import {CreateSecretBaseRequest, SecretBase, UpdateSecretBaseRequest} from 'src/model/secret-base';

export default class SecretBaseAPI {
    static async list(): Promise<SecretBase[]> {
        const {data} = await api.get('secret-bases');
        return data;
    }

    static async save(request: CreateSecretBaseRequest): Promise<SecretBase> {
        const {data} = await api.post('secret-bases', request);
        return data;
    }

    static async delete(id: number) {
        const {data} = await api.delete(`secret-bases/${id}`);
        return data;
    }

    static async update(id: number, request: UpdateSecretBaseRequest): Promise<SecretBase> {
        const {data} = await api.put(`secret-bases/${id}`, request);
        return data;
    }

}
