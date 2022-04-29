import { DataQuery } from '@grafana/data';
export type StarWarsConfig = {};
export type StarWarsSecureConfig = {};

export type StarwarsQueryType = 'people' | 'planets' | 'films-list-by-people-id';

type StarwarsBaseQuery<Q extends StarwarsQueryType> = { queryType: Q } & DataQuery;
type StarwarsPeopleQuery = {} & StarwarsBaseQuery<'people'>;
type StarwarsPlanetsQuery = {} & StarwarsBaseQuery<'planets'>;
type StarwarsFilsByPeopleQuery = { peopleId: string } & StarwarsBaseQuery<'films-list-by-people-id'>;
export type StarWarsQuery = StarwarsPeopleQuery | StarwarsPlanetsQuery | StarwarsFilsByPeopleQuery;

export type VariableQueryType = 'people-ids' | 'vehicle-ids' | 'starships-ids' | 'hair-colors';
type VariableQueryPeopleIDs = { queryType: 'people-ids'; hair_color?: string };
type VariableQueryVehicleIDs = { queryType: 'vehicle-ids' };
type VariableQueryStarShipIDs = { queryType: 'starships-ids' };
type VariableQueryHairColors = { queryType: 'hair-colors' };
export type StarWarsVariableQuery =
  | VariableQueryPeopleIDs
  | VariableQueryVehicleIDs
  | VariableQueryStarShipIDs
  | VariableQueryHairColors;

export type SWPeople = {
  name: string;
  url: string;
  birth_year?: string;
  hair_color?: string;
  created?: string;
  films?: string[];
  species?: string[];
  starships?: string[];
  vehicles?: string[];
};

// type Profession = 'doctor' | 'engineer';
// type Human<P extends Profession> = { name: string; profession: P };
// type Doctor = { specialties: string[] } & Human<'doctor'>;
// type Engineer = { tools: string[] } & Human<'engineer'>;
// type Professionals = Doctor | Engineer;

// const user: Human<'doctor'> = { name: 'foo', profession: 'doctor' };
// const drMolrolam: Doctor = { name: 'Dr. Molralam', profession: 'doctor', specialties: ['heart', 'dentist'] };
// const erBran: Engineer = { name: 'Er. Bran', profession: 'engineer', tools: ['pen', 'paper'] };
// const mrFoo: Professionals = { profession: 'engineer', tools: ['pen'], name: 'Mr Foo' };
// const mrBar: Professionals = { profession: 'doctor', specialties: ['hair'], name: 'Mr Bar' };
