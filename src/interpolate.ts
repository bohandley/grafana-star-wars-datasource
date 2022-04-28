import { StarWarsQuery } from './types';
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
