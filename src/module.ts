import { DataSourcePlugin } from '@grafana/data';
import { StarWarsDataSource } from './datasource';
import { ConfigEditor, QueryEditor } from './editor';
import { StarWarsConfig, StarWarsQuery, StarWarsSecureConfig } from './types';

export const plugin = new DataSourcePlugin<StarWarsDataSource, StarWarsQuery, StarWarsConfig, StarWarsSecureConfig>(
  StarWarsDataSource
)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
