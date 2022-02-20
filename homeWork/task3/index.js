const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';

const body = document.querySelector('body');

const dataContainer = document.createElement('ul');
dataContainer.className = 'data-container';

const loader = document.createElement('span');
loader.setAttribute('id', 'loader');
loader.setAttribute('hidden', '');
loader.textContent = 'Загрузка...';

dataContainer.append(loader);
body.append(dataContainer);

const createAlbumElement = (title) => {
  const albumElement = document.createElement('li');
  albumElement.textContent = title;
  dataContainer.append(albumElement);
  return albumElement;
}

const toggleLoader = () => {
  const loaderHtml = document.querySelector('#loader');
  const isHidden = loaderHtml.hasAttribute('hidden');
  if (isHidden) {
    loaderHtml.removeAttribute('hidden');
  } else {
    loaderHtml.setAttribute('hidden', '');
  }
}

const renderAlbums = async () => {
  toggleLoader();
  try {
  const result = await fetch(ALBUMS_URL);
  console.log('result ', result);
  const albums = await result.json();
  console.log('albums', albums);
  albums.forEach((album) => {
    const albumHtml = createAlbumElement(album.title);
    dataContainer.append(albumHtml);
  })
  } catch (error) {
    dataContainer.textContent = 'Произошла ошибка в получении данных об альбомах...';
  } finally {
    toggleLoader();
  }
}

const promise = renderAlbums();