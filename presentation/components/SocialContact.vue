<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="flex items-center gap-4 text-6xl mb-8">
      <div class="rotating-logo">
        <carbon-logo-github class="logo github" />
        <div class="logo x">𝕏</div>
        <div class="logo bluesky">🦋</div>
      </div>
      <span class="text-4xl text-gray-300">/chiubaca</span>
    </div>
    <p class="text-xl text-gray-400">SWE @ Zoopla</p>
  </div>
</template>

<style scoped>
.rotating-logo {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo {
  position: absolute;
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
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