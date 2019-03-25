import axios from 'axios';
import Auth from '../common/auth.common';

const baseURL = 'http://localhost:7777';
// const baseURL = "https://backend-mloidi.herokuapp.com";

axios.defaults.baseURL = baseURL;

axios.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err.response)
);

const checkErrors = status => {
  if (status === 401) {
    Auth.deauthenticateUser();
  }
};

const getAuthHeader = () => ({ Authorization: `Bearer ${Auth.getToken()}` });

export const AuthService = {
  login: async (email, password) => {
    let res = { token: null, user: null };
    await axios
      .post('/login', { email, password })
      .then(response => {
        const { token, user } = response;
        res.token = token;
        res.user = user;
        Auth.authenticateUser(token);
      })
      .catch(error => {
        checkErrors(error.status);
        throw error;
      });
    return res;
  },
  logout: async () => {
    let res = '';
    await axios
      .post(
        '/logout',
        {},
        {
          headers: getAuthHeader()
        }
      )
      .then(response => {
        res = response;
        Auth.deauthenticateUser();
      })
      .catch(error => {
        checkErrors(error.status);
        res = error;
        throw error;
      });
    return res;
  }
};

export const ItemService = {
  // Add new Item
  addItem: async item => {
    return await axios.post('/mloidi/item/', { item });
  },
  // Edit a Item
  editItem: async item => {
    return await axios.patch('/mloidi/item/', { item });
  },
  // Get all Items
  getItems: async () => {
    return await axios.get('/mloidi/items');
  },

  // Get all public Items
  getPublicItems: async () => {
    return await axios.get('/mloidi/public/items');
  },

  // Get one Item by id
  getItem: async itemId => {
    return await axios.get(`/mloidi/item/${itemId}`);
  }
};

export const OrganizationService = {
  // Get all Organizations
  getOrganizations: async () => {
    let res = [];
    await axios
      .get('/admin/organization', {
        headers: getAuthHeader()
      })
      .then(response => {
        res = response;
      })
      .catch(error => {
        checkErrors(error.status);
        throw error;
      });
    return res;
  },
  // Add new Organization
  addOrganization: async organization => {
    let res = {};
    await axios
      .post(
        '/admin/organization/',
        { organization },
        {
          headers: getAuthHeader()
        }
      )
      .then(response => {
        res = response;
      })
      .catch(error => {
        checkErrors(error.status);
        throw error;
      });
    return res;
  },
  // Edit a Organization
  editOrganization: async organization => {
    let res = {};
    await axios
      .patch(
        '/admin/organization/',
        { organization },
        {
          headers: getAuthHeader()
        }
      )
      .then(response => {
        res = response;
      })
      .catch(error => {
        checkErrors(error.status);
        throw error;
      });
    return res;
  },
  // Delete one Organization by id
  deleteOrganization: async organizationId => {
    let res = {};
    await axios
      .delete(`/admin/organization/${organizationId}`, {
        headers: getAuthHeader()
      })
      .then(response => {
        res = response;
      })
      .catch(error => {
        checkErrors(error.status);
        throw error;
      });
    return res;
  },
  // Get all public Organization - Not used
  getPublicOrganization: async () => {
    return await axios.get('/admin/public/organization', {
      headers: getAuthHeader()
    });
  },
  // Get one Organization by id - Not used
  getOrganization: async organizationId => {
    return await axios.get(`/admin/organization/${organizationId}`, {
      headers: getAuthHeader()
    });
  }
};

export const SkillService = {
  // Get all Skills
  getSkills: async () => {
    let res = [];
    await axios
      .get('/admin/skill', {
        headers: getAuthHeader()
      })
      .then(response => {
        res = response;
      })
      .catch(error => {
        checkErrors(error.status);
        throw error;
      });
    return res;
  },
  // Add new Skill
  addSkill: async skill => {
    let res = {};
    await axios
      .post(
        '/admin/skill/',
        { skill },
        {
          headers: getAuthHeader()
        }
      )
      .then(response => {
        res = response;
      })
      .catch(error => {
        checkErrors(error.status);
        throw error;
      });
    return res;
  },
  // Edit a Skill
  editSkill: async skill => {
    let res = {};
    await axios
      .patch(
        '/admin/skill/',
        { skill },
        {
          headers: getAuthHeader()
        }
      )
      .then(response => {
        res = response;
      })
      .catch(error => {
        checkErrors(error.status);
        throw error;
      });
    return res;
  },
  // Delete one Skill by id
  deleteSkill: async skillId => {
    let res = {};
    await axios
      .delete(`/admin/skill/${skillId}`, {
        headers: getAuthHeader()
      })
      .then(response => {
        res = response;
      })
      .catch(error => {
        checkErrors(error.status);
        throw error;
      });
    return res;
  },
  // Get all public Skill - Not used
  getPublicSkill: async () => {
    return await axios.get('/admin/public/skill', {
      headers: getAuthHeader()
    });
  },
  // Get one Skill by id - Not used
  getSkill: async skillId => {
    return await axios.get(`/admin/skill/${skillId}`, {
      headers: getAuthHeader()
    });
  }
};

export const UserService = {
  // Add new User
  addUser: async user => {
    return await axios.post(
      '/admin/user/',
      { user },
      {
        headers: getAuthHeader()
      }
    );
  },
  // Edit a User
  editUser: async user => {
    return await axios.patch(
      '/admin/user/',
      { user },
      {
        headers: getAuthHeader()
      }
    );
  },
  // Get all Users
  getUsers: async () => {
    return await axios.get('/admin/user', {
      headers: getAuthHeader()
    });
  },

  // Get all public User
  getPublicUser: async () => {
    return await axios.get('/admin/public/user', {
      headers: getAuthHeader()
    });
  },

  // Get one User by id
  getUser: async userId => {
    return await axios.get(`/admin/user/${userId}`, {
      headers: getAuthHeader()
    });
  },

  // Delete one User by id
  deleteUser: async userId => {
    return await axios.delete(`/admin/user/${userId}`, {
      headers: getAuthHeader()
    });
  }
};

export const ItemTypeService = {
  // Add new ItemType
  addItemType: async itemType => {
    return await axios.post(
      '/admin/itemType/',
      { itemType },
      {
        headers: getAuthHeader()
      }
    );
  },
  // Edit a ItemType
  editItemType: async itemType => {
    return await axios.patch(
      '/admin/itemType/',
      { itemType },
      {
        headers: getAuthHeader()
      }
    );
  },
  // Get all ItemTypes
  getItemTypes: async () => {
    return await axios.get('/admin/itemType', {
      headers: getAuthHeader()
    });
  },

  // Get all public ItemTypes
  getPublicItemTypes: async () => {
    return await axios.get('/admin/public/itemType', {
      headers: getAuthHeader()
    });
  },

  // Get one Item by id
  getItemType: async itemTypeId => {
    return await axios.get(`/admin/itemType/${itemTypeId}`, {
      headers: getAuthHeader()
    });
  }
};
