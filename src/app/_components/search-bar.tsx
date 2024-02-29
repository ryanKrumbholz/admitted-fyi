import { api } from '~/trpc/server'
import { TextField } from './text-field'


export default async function SearchBar(){
    // TODO: handle search
    return (
      <div>
        <TextField label='Search admission results'/>
      </div>
    )
}