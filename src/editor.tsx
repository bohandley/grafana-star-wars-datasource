import React from 'react';
import { SelectableValue, QueryEditorProps } from '@grafana/data';
import { InlineFormLabel, Select, Input } from '@grafana/ui';
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
          value={query.queryType}
          onChange={(e) => {
            onChange({ ...query, queryType: e.value! } as StarWarsQuery);
            onRunQuery();
          }}
        />
      </div>
      {query.queryType === 'films-list-by-people-id' && (
        <div className="gf-form">
          <InlineFormLabel>People ID</InlineFormLabel>
          <Input
            value={query.peopleId}
            type="number"
            onChange={(e) => {
              onChange({ ...query, peopleId: e.currentTarget.valueAsNumber || 1 });
              onRunQuery();
            }}
          />
        </div>
      )}
    </>
  );
};
