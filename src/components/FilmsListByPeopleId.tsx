import React from 'react';
import { InlineFormLabel, Input } from '@grafana/ui';

type FilmsListByPeopleIdEditorProps = {
  peopleId: string;
  onPeopleIdChange: (peopleId: string) => void;
};

export const FilmsListByPeopleIdEditor = (props: FilmsListByPeopleIdEditorProps) => {
  return (
    <div className="gf-form">
      <InlineFormLabel>People ID</InlineFormLabel>
      <Input value={props.peopleId || '1'} onChange={(e) => props.onPeopleIdChange(e.currentTarget.value)} />
    </div>
  );
};
