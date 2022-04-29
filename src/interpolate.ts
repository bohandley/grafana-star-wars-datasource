import { StarWarsQuery, StarWarsVariableQuery } from './types';
import { getTemplateSrv } from '@grafana/runtime';

export const interpolateQuery = (query: StarWarsQuery): StarWarsQuery => {
  if (query.queryType === 'films-list-by-people-id') {
    return {
      ...query,
      peopleId: getTemplateSrv().replace(query.peopleId || '1'),
    };
  }
  return query;
};

export const interpolateVariableQuery = (query: StarWarsVariableQuery): StarWarsVariableQuery => {
  if (query.queryType === 'people-ids') {
    return {
      ...query,
      hairColor: getTemplateSrv().replace(query.hairColor || 'n/a'),
      gender: getTemplateSrv().replace(query.gender || 'n/a'),
    };
  }
  return query;
};
