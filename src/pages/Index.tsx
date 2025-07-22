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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-600/10"></div>
        <div className="relative px-6 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Icon name="Camera" size={48} className="text-yellow-400 mr-4" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                ACTORS CATALOG
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Откройте для себя талантливых актёров для вашего следующего проекта. 
              Профессиональные портфолио в стиле голливудских постеров.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Поиск по имени актёра..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800/50 border-yellow-400/30 text-white placeholder-gray-400 focus:border-yellow-400"
                />
              </div>
              
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger className="bg-gray-800/50 border-yellow-400/30 text-white">
                  <SelectValue placeholder="Возраст" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20-30">20-30 лет</SelectItem>
                  <SelectItem value="30-40">30-40 лет</SelectItem>
                  <SelectItem value="40+">40+ лет</SelectItem>
                </SelectContent>
              </Select>

              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="bg-gray-800/50 border-yellow-400/30 text-white">
                  <SelectValue placeholder="Опыт" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="начинающий">Начинающий (до 3 лет)</SelectItem>
                  <SelectItem value="опытный">Опытный (3-10 лет)</SelectItem>
                  <SelectItem value="мастер">Мастер (10+ лет)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={genreFilter} onValueChange={setGenreFilter}>
                <SelectTrigger className="bg-gray-800/50 border-yellow-400/30 text-white">
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
            
            <div className="flex gap-4">
              <Button 
                onClick={handleFilter}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:from-yellow-300 hover:to-amber-400 flex-1 md:flex-none"
              >
                <Icon name="Search" size={20} className="mr-2" />
                Найти актёров
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
                className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
              >
                Сбросить
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Actors Grid */}
      <div className="px-6 py-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-yellow-400">Наши таланты</h2>
          <div className="text-gray-400">
            Найдено: <span className="text-yellow-400 font-semibold">{filteredActors.length}</span> актёров
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActors.map((actor) => (
            <Card key={actor.id} className="bg-gradient-to-b from-gray-800 to-gray-900 border-yellow-400/20 overflow-hidden hover:scale-105 transition-all duration-300 hover:border-yellow-400/50">
              <div className="relative group">
                <img 
                  src={actor.image} 
                  alt={actor.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-semibold">
                    <Icon name="Star" size={16} className="mr-1 fill-current" />
                    {actor.rating}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{actor.name}</h3>
                <div className="flex items-center text-gray-400 mb-4 space-x-4">
                  <span className="flex items-center">
                    <Icon name="Calendar" size={16} className="mr-1" />
                    {actor.age} лет
                  </span>
                  <span className="flex items-center">
                    <Icon name="Clock" size={16} className="mr-1" />
                    {actor.experience}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Жанры:</p>
                  <div className="flex flex-wrap gap-2">
                    {actor.genres.map((genre, index) => (
                      <Badge key={index} variant="outline" className="border-yellow-400/30 text-yellow-400">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Фильмография:</p>
                  <div className="text-sm text-gray-300">
                    {actor.filmography.slice(0, 2).join(', ')}
                    {actor.filmography.length > 2 && ` и ещё ${actor.filmography.length - 2}`}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:from-yellow-300 hover:to-amber-400 flex-1">
                    Портфолио
                  </Button>
                  <Button variant="outline" className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10">
                    <Icon name="Heart" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredActors.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">Актёры не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-yellow-400/20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Icon name="Film" size={32} className="text-yellow-400 mr-3" />
            <span className="text-2xl font-bold text-yellow-400">ACTORS CATALOG</span>
          </div>
          <p className="text-gray-400">Профессиональные актёры для вашего проекта</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;