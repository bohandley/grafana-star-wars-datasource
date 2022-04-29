import React from 'react';
import { RadioButtonGroup, InlineFormLabel, Input } from '@grafana/ui';
import { StarWarsVariableQuery, VariableQueryType } from './types';
import { SelectableValue } from '@grafana/data';

type StarWarsVariableEditorProps = {
  query: StarWarsVariableQuery;
  onChange: (query: StarWarsVariableQuery) => void;
};

const variableQueryTypes: SelectableValue<VariableQueryType>[] = [
  { value: 'people-ids', label: 'People IDs' },
  { value: 'vehicle-ids', label: 'Vehicle IDs' },
  { value: 'starships-ids', label: 'StarShip IDs' },
  { value: 'hair-colors', label: 'Hair Colors' },
];

export const StarWarsVariableEditor = (props: StarWarsVariableEditorProps) => {
  return (
    <>
      <div className="gf-form">
        <InlineFormLabel>Query Type</InlineFormLabel>
        <RadioButtonGroup<VariableQueryType>
          value={props.query.queryType || 'people-ids'}
          options={variableQueryTypes}
          onChange={(e) => {
            props.onChange({ ...props.query, queryType: e });
          }}
        ></RadioButtonGroup>
      </div>
      {props.query.queryType === 'people-ids' && (
        <>
          <div className="gf-form">
            <InlineFormLabel>Hair Color</InlineFormLabel>
            <Input
              value={props.query.hair_color || 'n/a'}
              onChange={(e) => {
                props.onChange({ ...props.query, hair_color: e.currentTarget.value || '' } as StarWarsVariableQuery);
              }}
            ></Input>
          </div>
        </>
      )}
    </>
  );
};
