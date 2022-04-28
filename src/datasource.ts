import {
  DataSourceApi,
  DataSourceInstanceSettings,
  DataQueryRequest,
  toDataFrame,
  MutableDataFrame,
  MetricFindValue,
} from '@grafana/data';
import { interpolateQuery } from './interpolate';
import { StarWarsConfig, StarWarsQuery } from './types';

export class StarWarsDataSource extends DataSourceApi<StarWarsQuery> {
  constructor(instanceSettings: DataSourceInstanceSettings<StarWarsConfig>) {
    super(instanceSettings);
  }
  async query(request: DataQueryRequest<StarWarsQuery>) {
    if (request.targets && request.targets.length > 0) {
      let actualQuery = interpolateQuery(request.targets[0]);
      switch (actualQuery.queryType) {
        case 'films-list-by-people-id':
          const individualPeopleURL = `https://swapi.dev/api/people/${actualQuery.peopleId}`;
          const individualPeopleFrame = await fetch(individualPeopleURL)
            .then((res) => res.json())
            .then((res) => {
              const films: any[] = res?.films || [];
              return new MutableDataFrame({
                name: 'movies',
                fields: [
                  {
                    name: 'film-url',
                    values: films,
                  },
                ],
              });
            });
          return Promise.resolve({ data: [individualPeopleFrame] });
        case 'people':
          const peopleURL = 'https://swapi.dev/api/people';
          const result = await fetch(peopleURL)
            .then((res) => res.json())
            .then((res) => {
              const peoples: any[] = res?.results || [];
              return toDataFrame(peoples);
            });
          return Promise.resolve({ data: [result] });
        case 'planets':
        default:
          const planetsURL = 'https://swapi.dev/api/planets';
          const planetsFrame = await fetch(planetsURL)
            .then((res) => res.json())
            .then((res) => {
              const planets: any[] = res?.results || [];
              return toDataFrame(planets);
            });
          return Promise.resolve({ data: [planetsFrame] });
      }
    }
    return Promise.resolve({
      data: [],
    });
  }
  testDatasource() {
    return Promise.resolve({
      status: 'success',
      message: 'plugin working',
    });
  }
  metricFindQuery(): Promise<MetricFindValue[]> {
    return Promise.resolve([{ text: '1' }, { text: '2' }, { text: '3' }]);
  }
}
