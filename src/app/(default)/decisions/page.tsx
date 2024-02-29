import { api } from '~/trpc/server';
import { Pagination } from '../../_components/pagination';
import SearchBar from '~/app/_components/search-bar';

const DECISIONS_PER_PAGE = 20;

export default async function DecisionsPage() {
  const {decisions} = await api.decision.feed.query();

  return (
  <div className="container mx-auto">
    <SearchBar/>
    <ul>
      {decisions.map((decision) => (
        <li>
          <a href="#" className="block max-w-sm p-6 bg-white  dark:bg-gray-800">

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{decision.program.name}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{decision.id}</p>
          </a>
        </li>
        ))}
    </ul>
    <Pagination itemCount={20} itemsPerPage={DECISIONS_PER_PAGE} currentPageNumber={0}/>
  </div>
);
}
