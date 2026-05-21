<template>
  <div class="navBar">
    <nav
      id="navbar-principal"
      class="navbar navbar-expand-lg navbar-dark bg-feb-marca border-bottom py-2 py-md-3 nav-feb"
    >
      <div class="container-fluid nav-feb-layout">
        <a class="navbar-brand d-flex align-items-center gap-2 mb-0" href="#">
          <span class="navbar-brand-text">Flores Eternamente Bellas</span>
        </a>

        <div
          class="collapse navbar-collapse nav-feb-collapse"
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

        <div class="nav-feb-aside d-flex align-items-center flex-shrink-0">
          <button
            class="navbar-toggler nav-feb-toggler d-lg-none"
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
.nav-feb {
  border-color: var(--feb-borde-sutil) !important;
  box-shadow: 0 1px 0 0 rgba(109, 44, 53, 0.35);
}

.nav-feb-layout {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.85rem;
}

.nav-feb-collapse {
  flex: 1 1 100%;
  order: 4;
}

@media (min-width: 992px) {
  .nav-feb-collapse {
    flex: 1 1 auto;
    order: 2;
    width: auto;
  }
}

.nav-feb-aside {
  order: 3;
  margin-left: auto;
  gap: 0.65rem;
}

@media (min-width: 992px) {
  .nav-feb-aside {
    margin-left: 0;
  }
}

.nav-feb .navbar-brand,
.nav-feb .navbar-brand-text {
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Mismo tono que el fondo de Avatar.jpg */
.nav-feb .navbar-brand-text {
  color: var(--feb-avatar-fondo);
}

.nav-feb .navbar-brand:hover .navbar-brand-text,
.nav-feb .navbar-brand:focus-visible .navbar-brand-text {
  color: var(--feb-avatar-fondo-hover);
}

.nav-feb .nav-link {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.92);
}

.nav-feb .navbar-nav .nav-link {
  position: relative;
  padding-inline: 0.75rem;
  padding-block: 0.4rem;
  border-radius: 0.4rem;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.nav-feb .navbar-nav .nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0.15rem;
  width: 0;
  height: 2px;
  border-radius: 2px;
  background-color: var(--feb-acento, #6d2c35);
  transform: translateX(-50%);
  transition: width 0.28s ease;
}

.nav-feb .navbar-nav .nav-link:hover,
.nav-feb .navbar-nav .nav-link:focus-visible {
  color: #fff;
  background-color: rgba(var(--feb-avatar-fondo-rgb), 0.14);
  transform: translateY(-2px);
}

.nav-feb .navbar-nav .nav-link:hover::after,
.nav-feb .navbar-nav .nav-link:focus-visible::after {
  width: calc(100% - 1.1rem);
}

@media (prefers-reduced-motion: reduce) {
  .nav-feb .navbar-nav .nav-link {
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  .nav-feb .navbar-nav .nav-link:hover,
  .nav-feb .navbar-nav .nav-link:focus-visible {
    transform: none;
  }

  .nav-feb .navbar-nav .nav-link::after {
    transition: width 0.15s ease;
  }
}

.nav-feb-toggler,
.navbar-toggler {
  border-color: rgba(var(--feb-avatar-fondo-rgb), 0.45);
  padding: 0.35rem 0.55rem;
}

.nav-feb .navbar-brand {
  order: 1;
  font-size: 1.15rem;
}

@media (min-width: 768px) {
  .nav-feb .navbar-brand {
    font-size: 1.3rem;
  }
}

@media (min-width: 992px) {
  .nav-feb .navbar-brand {
    font-size: 1.5rem;
  }
}

@media (min-width: 1200px) {
  .nav-feb .navbar-brand {
    font-size: 1.68rem;
  }
}

@media (max-width: 575.98px) {
  .nav-feb-layout {
    gap: 0.4rem 0.5rem;
  }

  .nav-feb .navbar-brand {
    flex: 1 1 auto;
    min-width: 0;
    max-width: calc(100% - 3.25rem);
  }

  .nav-feb .navbar-brand-text {
    display: block;
    overflow-wrap: anywhere;
    word-break: break-word;
    hyphens: auto;
    line-height: 1.15;
    font-size: clamp(0.78rem, 3.6vw, 1rem) !important;
    letter-spacing: 0.08em;
  }

  .nav-feb-collapse .navbar-nav {
    width: 100%;
    align-items: stretch !important;
    text-align: center;
  }

  .nav-feb-collapse .nav-link {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 399.98px) {
  .nav-feb .navbar-brand-text {
    font-size: 0.72rem !important;
    letter-spacing: 0.07em;
  }
}
</style>
