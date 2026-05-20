<template>
  <div class="navBar">
    <nav
      id="navbar-principal"
      class="navbar navbar-expand-lg navbar-dark bg-vin-negro border-bottom py-2 py-md-3 nav-vino"
    >
      <div class="container-fluid nav-vino-layout">
        <a class="navbar-brand d-flex align-items-center gap-2 mb-0" href="#">
          <span class="navbar-brand-text">Flores Eternamente Bellas</span>
        </a>

        <div
          class="collapse navbar-collapse nav-vino-collapse"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav ms-lg-auto mb-2 mb-lg-0 gap-2 gap-lg-4 align-items-lg-center">
            <li class="nav-item">
              <a class="nav-link" href="#flores">Flores</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#ramos">Ramos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#accesorios">Accesorios</a>
            </li>
          </ul>
        </div>

        <div class="nav-vino-aside d-flex align-items-center flex-shrink-0">
          <button
            class="navbar-toggler nav-vino-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Abrir menú de navegación"
          >
            <span class="navbar-toggler-icon" />
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>

</script>

<style scoped>
.nav-vino {
  border-color: var(--vin-borde-sutil) !important;
  box-shadow: 0 1px 0 0 rgba(109, 44, 53, 0.35);
}

.nav-vino-layout {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.85rem;
}

.nav-vino-collapse {
  flex: 1 1 100%;
  order: 4;
}

@media (min-width: 992px) {
  .nav-vino-collapse {
    flex: 1 1 auto;
    order: 2;
    width: auto;
  }
}

.nav-vino-aside {
  order: 3;
  margin-left: auto;
  gap: 0.65rem;
}

@media (min-width: 992px) {
  .nav-vino-aside {
    margin-left: 0;
  }
}

.nav-vino .navbar-brand {
  font-family: 'Nunito', system-ui, sans-serif;
}

/* Mismo tono que el fondo de Avatar.jpg */
.nav-vino .navbar-brand-text {
  color: var(--vin-avatar-fondo);
}

.nav-vino .navbar-brand:hover .navbar-brand-text,
.nav-vino .navbar-brand:focus-visible .navbar-brand-text {
  color: var(--vin-avatar-fondo-hover);
}

.nav-vino .nav-link {
  font-family: 'Nunito', system-ui, sans-serif;
  color: rgba(255, 255, 255, 0.92);
}

.nav-vino .navbar-nav .nav-link {
  position: relative;
  padding-inline: 0.75rem;
  padding-block: 0.4rem;
  border-radius: 0.4rem;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.nav-vino .navbar-nav .nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0.15rem;
  width: 0;
  height: 2px;
  border-radius: 2px;
  background-color: var(--vin-acento, #6d2c35);
  transform: translateX(-50%);
  transition: width 0.28s ease;
}

.nav-vino .navbar-nav .nav-link:hover,
.nav-vino .navbar-nav .nav-link:focus-visible {
  color: #fff;
  background-color: rgba(var(--vin-avatar-fondo-rgb), 0.14);
  transform: translateY(-2px);
}

.nav-vino .navbar-nav .nav-link:hover::after,
.nav-vino .navbar-nav .nav-link:focus-visible::after {
  width: calc(100% - 1.1rem);
}

@media (prefers-reduced-motion: reduce) {
  .nav-vino .navbar-nav .nav-link {
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  .nav-vino .navbar-nav .nav-link:hover,
  .nav-vino .navbar-nav .nav-link:focus-visible {
    transform: none;
  }

  .nav-vino .navbar-nav .nav-link::after {
    transition: width 0.15s ease;
  }
}

.nav-vino-toggler,
.navbar-toggler {
  border-color: rgba(var(--vin-avatar-fondo-rgb), 0.45);
  padding: 0.35rem 0.55rem;
}

.nav-vino .navbar-brand {
  order: 1;
  text-transform: uppercase;
  font-size: 1.15rem;
  letter-spacing: 0.04em;
}

@media (min-width: 768px) {
  .nav-vino .navbar-brand {
    font-size: 1.3rem;
  }
}

@media (min-width: 992px) {
  .nav-vino .navbar-brand {
    font-size: 1.5rem;
  }
}

@media (min-width: 1200px) {
  .nav-vino .navbar-brand {
    font-size: 1.68rem;
  }
}
</style>
