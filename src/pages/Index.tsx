import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Actor {
  id: number;
  name: string;
  age: number;
  experience: string;
  genres: string[];
  image: string;
  filmography: string[];
  rating: number;
}

const mockActors: Actor[] = [
  {
    id: 1,
    name: 'Александр Соколов',
    age: 32,
    experience: '8 лет',
    genres: ['Драма', 'Триллер', 'Боевик'],
    image: '/img/b2aa71a5-7d8f-4b3a-89a0-ebf746afc055.jpg',
    filmography: ['Последний герой', 'Тени прошлого', 'Код доступа'],
    rating: 4.8
  },
  {
    id: 2,
    name: 'Екатерина Волкова',
    age: 28,
    experience: '6 лет',
    genres: ['Драма', 'Романтика', 'Комедия'],
    image: '/img/8363313c-b2da-40af-8f43-8d08659c301d.jpg',
    filmography: ['Весенний дождь', 'Звёздная ночь', 'Городские истории'],
    rating: 4.9
  },
  {
    id: 3,
    name: 'Михаил Петров',
    age: 52,
    experience: '25 лет',
    genres: ['Драма', 'Историческое кино', 'Характерные роли'],
    image: '/img/7517e63f-af80-44b2-9c1e-1b85ec379344.jpg',
    filmography: ['Война и мир', 'Династия', 'Отцы и дети', 'Империя'],
    rating: 5.0
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [filteredActors, setFilteredActors] = useState(mockActors);

  const handleFilter = () => {
    let filtered = mockActors.filter(actor => {
      const matchesSearch = actor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAge = !ageFilter || 
        (ageFilter === '20-30' && actor.age >= 20 && actor.age <= 30) ||
        (ageFilter === '30-40' && actor.age >= 30 && actor.age <= 40) ||
        (ageFilter === '40+' && actor.age >= 40);
      const matchesExperience = !experienceFilter ||
        (experienceFilter === 'начинающий' && parseInt(actor.experience) <= 3) ||
        (experienceFilter === 'опытный' && parseInt(actor.experience) > 3 && parseInt(actor.experience) <= 10) ||
        (experienceFilter === 'мастер' && parseInt(actor.experience) > 10);
      const matchesGenre = !genreFilter || actor.genres.some(genre => 
        genre.toLowerCase().includes(genreFilter.toLowerCase())
      );
      
      return matchesSearch && matchesAge && matchesExperience && matchesGenre;
    });
    setFilteredActors(filtered);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-light tracking-wider text-center">
            ACTORS CATALOG
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div className="lg:col-span-2">
              <Input
                placeholder="Поиск актёров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-300 focus:border-black focus:ring-0"
              />
            </div>
            
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger className="border-gray-300 focus:border-black focus:ring-0">
                <SelectValue placeholder="Возраст" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20-30">20-30 лет</SelectItem>
                <SelectItem value="30-40">30-40 лет</SelectItem>
                <SelectItem value="40+">40+ лет</SelectItem>
              </SelectContent>
            </Select>

            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="border-gray-300 focus:border-black focus:ring-0">
                <SelectValue placeholder="Опыт" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="начинающий">Начинающий (до 3 лет)</SelectItem>
                <SelectItem value="опытный">Опытный (3-10 лет)</SelectItem>
                <SelectItem value="мастер">Мастер (10+ лет)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="border-gray-300 focus:border-black focus:ring-0">
                <SelectValue placeholder="Жанр" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="драма">Драма</SelectItem>
                <SelectItem value="комедия">Комедия</SelectItem>
                <SelectItem value="боевик">Боевик</SelectItem>
                <SelectItem value="триллер">Триллер</SelectItem>
                <SelectItem value="романтика">Романтика</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleFilter}
              className="bg-black text-white hover:bg-gray-800 px-6"
            >
              <Icon name="Search" size={18} className="mr-2" />
              Найти
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setAgeFilter('');
                setExperienceFilter('');
                setGenreFilter('');
                setFilteredActors(mockActors);
              }}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Сбросить
            </Button>
          </div>
        </div>
      </div>

      {/* Actors Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="text-gray-600 text-sm">
              {filteredActors.length} актёров найдено
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredActors.map((actor) => (
              <Card key={actor.id} className="border-0 shadow-none hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={actor.image} 
                    alt={actor.name}
                    className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-black text-white px-2 py-1 text-xs font-medium rounded">
                      ⭐ {actor.rating}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg text-black mb-2">{actor.name}</h3>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                    <span>{actor.age} лет</span>
                    <span>•</span>
                    <span>{actor.experience}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {actor.genres.slice(0, 2).map((genre, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700 border-0">
                          {genre}
                        </Badge>
                      ))}
                      {actor.genres.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 border-0">
                          +{actor.genres.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-500 text-xs mb-1">Фильмография:</p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {actor.filmography.slice(0, 2).join(', ')}
                      {actor.filmography.length > 2 && ` и ещё ${actor.filmography.length - 2}`}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="bg-black text-white hover:bg-gray-800 flex-1 text-xs">
                      Портфолио
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                      <Icon name="Heart" size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredActors.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Icon name="Search" size={48} className="mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-600">Актёры не найдены</h3>
                <p className="text-sm text-gray-500 mt-2">Попробуйте изменить параметры поиска</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;