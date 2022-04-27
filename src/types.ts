import { DataQuery } from '@grafana/data';
export type StarWarsConfig = {};
export type StarWarsSecureConfig = {};

export type StarwarsQueryType = 'people' | 'planets' | 'films-list-by-people-id';

type StarwarsBaseQuery<Q extends StarwarsQueryType> = { queryType: Q } & DataQuery;
type StarwarsPeopleQuery = {} & StarwarsBaseQuery<'people'>;
type StarwarsPlanetsQuery = {} & StarwarsBaseQuery<'planets'>;
type StarwarsFilsByPeopleQuery = { peopleId: number } & StarwarsBaseQuery<'films-list-by-people-id'>;
export type StarWarsQuery = StarwarsPeopleQuery | StarwarsPlanetsQuery | StarwarsFilsByPeopleQuery;

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
