
<template>
  <div class="flex flex-col items-center justify-center h-full">
  <img src="/me.jpg" alt="Avatar" class="w-32 h-32 rounded-full mb-4" />
    <h1 class="text-4xl font-bold mb-2">Alex Chiu</h1>
    <p class="text-xl text-gray-400">SWE @ Zoopla</p>
    <div class="flex items-center gap-2 mb-8">
      <div class="rotating-logo">
        <carbon-logo-github class="logo github" />
        <div class="logo x">𝕏</div>
        <div class="logo bluesky">🦋</div>
        <div class="logo mastodon">🐘</div>
      </div>
      <span class="text-2xl text-gray-700">/chiubaca</span>
    </div>

  </div>
  <img src="/me-qr.png" alt="Avatar" class="w-32 h-32 mb-4 bottom-0 right-0 absolute m-2" />
</template>

<style scoped>
.rotating-logo {
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo {
  position: absolute;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  /* Initial state - hidden and positioned above */
  transform: translateY(-80px) scale(0.8);
  opacity: 0;
}

.logo.github {
  animation: slideCircular 4s infinite ease-in-out;
  animation-delay: 0s;
}

.logo.x {
  animation: slideCircular 4s infinite ease-in-out;
  animation-delay: 1s;
  font-weight: bold;
}

.logo.bluesky {
  animation: slideCircular 4s infinite ease-in-out;
  animation-delay: 2s;
}

.logo.mastodon {
  animation: slideCircular 4s infinite ease-in-out;
  animation-delay: 3s;
}

@keyframes slideCircular {
  0%, 75%, 100% {
    transform: translateY(-80px) scale(0.8);
    opacity: 0;
  }
  2.5% {
    transform: translateY(-60px) scale(0.85);
    opacity: 0.2;
  }
  5% {
    transform: translateY(-40px) scale(0.9);
    opacity: 0.4;
  }
  7.5% {
    transform: translateY(-20px) scale(0.95);
    opacity: 0.7;
  }
  10% {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
  21% {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
  22.5% {
    transform: translateY(20px) scale(0.95);
    opacity: 0.7;
  }
  23.75% {
    transform: translateY(40px) scale(0.9);
    opacity: 0.4;
  }
  24.5% {
    transform: translateY(60px) scale(0.85);
    opacity: 0.2;
  }
  25% {
    transform: translateY(80px) scale(0.8);
    opacity: 0;
  }
}
</style>