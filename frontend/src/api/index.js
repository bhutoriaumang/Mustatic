import axios from "axios";

const baseUrl = "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await fetch(`/api/users/login`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const json = await res.json();
    return json;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/users/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/artists/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/albums/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/songs/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changeUserRole = async (id, role) => {
  try {
    const res = await axios.put(`${baseUrl}api/users/update/${id}`, {
      data: { role: role },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}api/users/delete/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const saveNewSong = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}api/songs/save`, { ...data });
    return (await res).data.song;
  } catch (error) {
    return null;
  }
};

export const saveNewArtist = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}api/artists/save`, { ...data });
    return (await res).data.artist;
  } catch (error) {
    return null;
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}api/albums/save`, { ...data });
    return (await res).data.album;
  } catch (error) {
    return null;
  }
};

export const deleteSong = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}api/songs/delete/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const deleteArtist = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}api/artists/delete/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const deleteAlbum = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}api/albums/delete/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};
