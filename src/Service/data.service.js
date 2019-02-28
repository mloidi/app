import axios from 'axios';
import Auth from '../common/auth.common';

axios.defaults.baseURL = 'http://localhost:7777';
// axios.defaults.baseURL = "https://backend-mloidi.herokuapp.com";

axios.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err.response)
);

const getAuthHeader = () => ({ Authorization: `Bearer ${Auth.getToken()}` });

export const AuthService = {
  login: async (email, password) => {
    return await axios.post('/auth', { email, password });
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

export const SkillService = {
  // Add new Skill
  addSkill: async skill => {
    return await axios.post(
      '/admin/skill/',
      { skill },
      {
        headers: getAuthHeader()
      }
    );
  },
  // Edit a Skill
  editSkill: async skill => {
    return await axios.patch(
      '/admin/skill/',
      { skill },
      {
        headers: getAuthHeader()
      }
    );
  },
  // Get all Skills
  getSkills: async () => {
    return await axios.get('/admin/skills', {
      headers: getAuthHeader()
    });
  },

  // Get all public Skill
  getPublicSkill: async () => {
    return await axios.get('/admin/public/skills', {
      headers: getAuthHeader()
    });
  },

  // Get one Skill by id
  getSkill: async skillId => {
    return await axios.get(`/admin/skill/${skillId}`, {
      headers: getAuthHeader()
    });
  },

  // Delete one Skill by id
  deleteSkill: async skillId => {
    console.log(skillId);
    return await axios.delete(`/admin/skill/${skillId}`, {
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
    return await axios.get('/admin/itemTypes', {
      headers: getAuthHeader()
    });
  },

  // Get all public ItemTypes
  getPublicItemTypes: async () => {
    return await axios.get('/admin/public/itemTypes', {
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
