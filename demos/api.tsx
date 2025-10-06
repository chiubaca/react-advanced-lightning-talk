const getSlowDataFromApi = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Simulate a slow network request.
    setTimeout(() => {
      resolve(String(Math.random()));
    }, 2000);
  });
};

let counter = 0;
async function submitMessage(message: string) {
  counter++;
  await new Promise((res) => setTimeout(res, 2000));
  if (counter > 3) {
    throw new Error("Failed to submit message");
  }

  return message;
}

async function getDogsFromApi() {
  await new Promise((res) => setTimeout(res, 2000));

  return [
    "https://images.dog.ceo/breeds/sheepdog-shetland/n02105855_13457.jpg",
    "https://images.dog.ceo/breeds/mastiff-english/3.jpg",
    "https://images.dog.ceo/breeds/terrier-wheaten/clementine.jpg",
    "https://images.dog.ceo/breeds/sheepdog-indian/Himalayan_Sheepdog.jpg",
  ];
}

async function getCatsFromApi() {
  await new Promise((res) => setTimeout(res, 500));

  return [
    "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs0HnVSIXkuBG-IhvtApPgK2GD_fWc50MUvQ&s",
    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
  ];
}

export const api = {
  getSlowDataFromApi,
  submitMessage,
  getDogsFromApi,
  getCatsFromApi,
};
