import axios from 'axios'
import { useEffect, Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listPokes } from './actions/pokeActions'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function App() {
    const [pokemonDetail, setPokemonDetail] = useState(null)
    const [pokemonURL, setPokemonURL] = useState(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const pokesList = useSelector((state) => state.pokesList)
    const { loading, error, pokes } = pokesList

    useEffect(() => {
        dispatch(listPokes())
    }, [dispatch])

    const pokemonDetailFncn = async (setPokemonDetail) => {
        if (pokemonDetail == null) {
            const { data } = await axios.get(pokemonURL)
            setPokemonDetail(data)
        }
    }

    useEffect(() => {
        if (!open) {
            setPokemonDetail(null)
        } else {
            pokemonDetailFncn(setPokemonDetail)
        }
    }, [pokemonDetailFncn, setPokemonDetail, setOpen, open]) 

    return (
        <div className="App">
            <div className='max-w-screen-xl xl:px-0 px-4 mx-auto'>
                {
                    loading 
                    ? 
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    : 
                    <div className="px-3 py-4 flex flex-col justify-center">
                        <h1 className='text-4xl font-bold uppercase py-10'>Pokemons:</h1>
                        <table className="w-full text-md bg-white shadow-md rounded mb-4">
                            <tbody>
                                <tr className="border-b">
                                    <th className="text-xl text-left p-3 px-5">Thumbnail</th>
                                    <th className="text-xl text-left p-3 px-5">Name</th>
                                    <th></th>
                                </tr>
                                {pokes?.map((pokemon, idx) => (
                                    <tr className={`border-b hover:bg-orange-100 ${idx % 2 == 0 && `bg-gray-100` }`} key={pokemon.url}>
                                        <td className="p-3 px-5">
                                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx+1}.png`}/>
                                        </td>
                                        <td className="p-3 px-5">{pokemon.name}</td>
                                        <td className="p-3 px-5 flex justify-end">
                                            <button 
                                                type="button" 
                                                className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                                onClick={() => setOpen(open => !open, setPokemonURL(pokemon.url))}
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-2xl font-bold uppercase leading-6 text-gray-900">
                                                    POKEMON: {pokemonDetail?.name}
                                                </Dialog.Title>
                                            </div>
                                            <div className="relative flex-1 px-4 sm:px-6 pt-5">
                                                <div className='flex items-center space-x-4 mx-auto justify-center w-full'>
                                                    <img src={pokemonDetail?.sprites?.back_default} />
                                                    <img src={pokemonDetail?.sprites?.front_default} />
                                                </div>
                                                <div className="w-full text-md bg-white shadow-md rounded mb-4 mt-5">
                                                    <div className='grid grid-cols-2'>
                                                        <div className="border-b">
                                                            <h3 className="text-xl text-left p-3 px-5">ID</h3>
                                                        </div>
                                                        <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                            <p className="p-3 px-5">{pokemonDetail?.id}</p>
                                                        </div>
                                                        <div className='border-b'>
                                                            <h3 className="text-xl text-left p-3 px-5">Height</h3>
                                                        </div>
                                                        <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                            <p className="p-3 px-5">{pokemonDetail?.height}</p>
                                                        </div>
                                                        <div className="border-b">
                                                            <h3 className="text-xl text-left p-3 px-5">Weight</h3>
                                                        </div>
                                                        <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                            <p className="p-3 px-5">{pokemonDetail?.weight}</p>
                                                        </div>
                                                        <div className='border-b'>
                                                            <h3 className="text-xl text-left p-3 px-5">Base Experience</h3>
                                                        </div>
                                                        <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                            <p className="p-3 px-5">{pokemonDetail?.base_experience}</p>
                                                        </div>
                                                        <div className='border-b'>
                                                            <h3 className="text-xl text-left p-3 px-5">Order</h3>
                                                        </div>
                                                        <div className="border-b hover:bg-orange-100 bg-gray-100">
                                                            <p className="p-3 px-5">{pokemonDetail?.order}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}

export default App;