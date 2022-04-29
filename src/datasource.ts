import {
  DataSourceApi,
  DataSourceInstanceSettings,
  DataQueryRequest,
  toDataFrame,
  MutableDataFrame,
  MetricFindValue,
} from '@grafana/data';
import { interpolateQuery, interpolateVariableQuery } from './interpolate';
import { StarWarsConfig, StarWarsQuery, StarWarsVariableQuery, SWPeople } from './types';

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
  async metricFindQuery(query: StarWarsVariableQuery): Promise<MetricFindValue[]> {
    const baseURL = 'https://swapi.dev/api/';
    const peopleURL = baseURL + 'people';
    const peopleList: SWPeople[] = await fetch(peopleURL)
      .then((res) => res.json())
      .then((res) => {
        return res?.results || [];
      });
    let interpolatedQuery = interpolateVariableQuery(query);
    switch (interpolatedQuery.queryType) {
      case 'hair-colors':
        return Promise.resolve(
          peopleList.map((p) => {
            return { text: p.hairColor || 'n/a', value: p.hairColor };
          })
        );
      case 'gender':
        return Promise.resolve(
          peopleList.map((p) => {
            return { text: p.gender || 'n/a', value: p.gender };
          })
        );
      case 'starships-ids':
        const starShips = peopleList.map((p) => p.starships || []).flat();
        return Promise.resolve(
          starShips.map((s) => {
            return { text: s.split('/')[5], value: s.split('/')[5] };
          })
        );
      case 'vehicle-ids':
        const vehicles = peopleList.map((p) => p.vehicles || []).flat();
        return Promise.resolve(
          vehicles.map((s) => {
            return { text: s.split('/')[5], value: s.split('/')[5] };
          })
        );
      case 'people-ids':
        if (interpolatedQuery.hairColor && interpolatedQuery.gender) {
          let hairColor: string = interpolatedQuery.hairColor;
          let gender: string = interpolatedQuery.gender;
          return Promise.resolve(
            peopleList
              .filter((p) => p.hairColor === hairColor && p.gender === gender)
              .map((p) => {
                return { text: p.name, value: p.url.split('/')[5] };
              })
          );
        }
        return Promise.resolve(
          peopleList.map((p) => {
            return { text: p.name, value: p.url.split('/')[5] };
          })
        );
      default:
        return Promise.resolve(
          peopleList.map((p) => {
            return { text: p.name, value: p.url.split('/')[5] };
          })
        );
    }
  }
}
