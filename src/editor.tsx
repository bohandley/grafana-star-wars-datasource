import React from 'react';
import { SelectableValue, QueryEditorProps } from '@grafana/data';
import { InlineFormLabel, Select } from '@grafana/ui';
import { FilmsListByPeopleIdEditor } from './components/FilmsListByPeopleId';
import { StarWarsDataSource } from './datasource';
import { StarwarsQueryType, StarWarsQuery, StarWarsConfig } from './types';

const queryTypes: SelectableValue<StarwarsQueryType>[] = [
  { value: 'people', label: 'Peoples list' },
  { value: 'planets', label: 'Planets list' },
  { value: 'films-list-by-people-id', label: 'Films by People ID' },
];

export const ConfigEditor = () => {
  return <>Config editor</>;
};

export const QueryEditor = (props: QueryEditorProps<StarWarsDataSource, StarWarsQuery, StarWarsConfig>) => {
  const { query, onChange, onRunQuery } = props;
  return (
    <>
      <div className="gf-form">
        <InlineFormLabel>Query Type</InlineFormLabel>
        <Select<StarwarsQueryType>
          options={queryTypes}
          value={query.queryType || 'planets'}
          onChange={(e) => {
            onChange({ ...query, queryType: e.value! } as StarWarsQuery);
            onRunQuery();
          }}
        />
      </div>
      {query.queryType === 'films-list-by-people-id' && (
        <FilmsListByPeopleIdEditor
          peopleId={query.peopleId || '1'}
          onPeopleIdChange={(peopleId: string) => {
            onChange({ ...query, peopleId });
            onRunQuery();
          }}
        />
      )}
    </>
  );
};
