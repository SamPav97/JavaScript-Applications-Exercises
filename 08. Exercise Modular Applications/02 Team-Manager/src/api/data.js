import * as api from './api.js'
// this is the data file where ull be gettn all ur data
//this is a dix with urls for all data locations
const endpoints = {
    'teams': '/data/teams',
    'getAllMembers': `/data/members?where=`,
    'getTeam': '/data/teams/',
    'create': '/data/teams',
    'getAllTeamsOfMember': '/data/members',
    'furnitureById': '/data/catalog/',
    'allTeamMembers': '/data/members',
    'delete': '/data/members/'
    
};
// this is the func for gettn all furniture
export async function getAllTeams() {
   return api.get(endpoints.teams)
}

export async function createTeam(teamData) {
    return api.post(endpoints.create, teamData)
}

export async function getAllById(id) {// asks for the data about the furniture w the given id
    return api.get(endpoints.getAllMembers + id);
}

export async function getById(id) {// asks for the data about the furniture w the given id
    return api.get(endpoints.getTeam + id);
}

export async function getAllTeamsOfMember(id) {
    return api.get(endpoints.getAllTeamsOfMember + id);
}

export async function getAllMembersOfTeam(id) {
    return api.get(endpoints.allTeamMembers + id);
}

export async function updateById(id) {// asks for the data about the furniture w the given id
    return api.put(endpoints.furnitureById + id);
}

export async function deleteById(id) {
    return api.delete(endpoints.delete + id)
}

export async function myFurniture(id) {
    return api.get(`/data/catalog?where=_ownerId%3D%22${id}%22`) //get the furniture that ive created
}