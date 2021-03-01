import axios from "axios";
const api = "https://safe-hamlet-24147.herokuapp.com/api/v1";
// const api = "https://gentle-garden-74127.herokuapp.com/api/v1";
// const api = "http://65.1.60.227:4040/api/v1";

export class ApiService {

  async getData(url, data, cancelToken, headers) {
    const config = {
      headers: {
        ...(headers || {}),
      },
    };
    let resData = '';
    const response = await axios.get(url, data, config).catch((err) => {
      resData = { error: 'something went wrong' };
    });
    return resData || response.data;
  }

  async postMethod(url, data, headers, cancelToken) {
    const config = {
      headers: {
        ...(headers || {}),
        //'content-type': 'application/x-www-form-urlencoded',
      },
    };
    if (cancelToken && cancelToken.token) {
      config.cancelToken = cancelToken.token;
    }
    let resData = '';
    const response = await axios.post(url, data, config).catch(thrown => {
      if (thrown.toString() === 'Cancel') {
        resData = 'cancel';
      } else {
        resData = { error: 'something went wrong' };;
      }
    });
    return resData || response.data;
  }

  async putMethod(url, data, headers) {
    const config = {
      headers: {
        ...(headers || {}),
      }
    };
    let resData = '';
    const response = await axios.put(url, data, config).catch(err => {
      resData = { error: 'something went wrong' };
    });
    return resData || response.data;
  }

  async deleteMethod(url, headers) {
    const config = {
      headers: {
        ...(headers || {})
      },
    };
    let resData = '';
    const response = await axios.delete(url, config).catch(err => {
      resData = { error: 'something went wrong' };
    });
    return resData || response.data;
  }

  async clusterById(url, headers) {
    const config = {
      headers: {
        ...(headers || {})
      }
    }
    let resData = ''
    const response = await axios.get(url, config).catch(err => {
      resData = { error: 'Something went wrong' };
    });
    return resData || response.data;
  }

  async getCluster(payload) {
    return await this.getData(`${api}/cluster/?cluster_for=${payload}`, '');
  }
  async getDatabaseUser() {
    return await this.getData(`${api}/databaseUser`, '');
  }
  async getNetwork() {
    return await this.getData(`${api}/network`, '');
  }
  async runScriptCluster(payload) {
    return await this.postMethod(`${api}/cluster/runscript`, payload);
  }
  async runScriptPostgres(payload) {
    return await this.postMethod(`${api}/cluster/runScriptForPostgres`, payload);
  }
  async runScriptMySQL(payload) {
    return await this.postMethod(`${api}/cluster/runScriptForMySQL`, payload);
  }
  async runScriptUpdateCluster(payload) {
    return await this.postMethod(`${api}/cluster/updatescript`, payload);
  }
  async clusterCreate(payload) {
    return await this.postMethod(`${api}/cluster/create`, payload);
  }
  async databaseUserCreate(payload) {
    return await this.postMethod(`${api}/databaseUser/create`, payload);
  }
  async networkCreate(payload) {
    return await this.postMethod(`${api}/network/create`, payload);
  }
  async clusterUpdate(payload) {
    return await this.putMethod(`${api}/cluster/`, payload);
  }
  async databaseUserUpdate(payload) {
    return await this.putMethod(`${api}/databaseUser/`, payload);
  }
  async clusterDelete(id) {
    return await this.deleteMethod(`${api}/cluster/${id}`);
  }
  async networkDelete(id) {
    return await this.deleteMethod(`${api}/network/${id}`);
  }
  async databaseDelete(id) {
    return await this.deleteMethod(`${api}/databaseUser/${id}`);
  }
  async getClusterById(id) {
    return await this.clusterById(`${api}/cluster/${id}`);
  }
}

export default ApiService
