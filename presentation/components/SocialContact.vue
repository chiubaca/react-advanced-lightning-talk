
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
      </div>
      <span class="text-2xl text-gray-700">/chiubaca</span>
    </div>

  </div>
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
}

.logo.github {
  animation: slideCircular 3s infinite ease-in-out;
  animation-delay: 0s;
}

.logo.x {
  animation: slideCircular 3s infinite ease-in-out;
  animation-delay: 1s;
  font-weight: bold;
}

.logo.bluesky {
  animation: slideCircular 3s infinite ease-in-out;
  animation-delay: 2s;
}

@keyframes slideCircular {
  0% {
    transform: translateY(-80px) scale(0.8);
    opacity: 0;
  }
  20% {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
  30% {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
  45% {
    transform: translateY(80px) scale(0.8);
    opacity: 0;
  }
  100% {
    transform: translateY(80px) scale(0.8);
    opacity: 0;
  }
}
</style>