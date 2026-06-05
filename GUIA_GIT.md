# Guía Rápida de Git 🚀

Esta guía contiene los comandos esenciales de Git explicados de forma muy sencilla.

---

## 1. Configuración Inicial
Configura tu identidad antes de empezar a trabajar. Solo se hace la primera vez.

```bash
# Define tu nombre global
git config --global user.name "Tu Nombre"

# Define tu correo electrónico global
git config --global user.email "tu@email.com"
```

---

## 2. Iniciar un Repositorio
Crea un repositorio local nuevo o descarga uno existente de internet.

```bash
# Inicia un repositorio local en la carpeta actual
git init

# Descarga un proyecto completo desde GitHub a tu computadora
git clone <url-del-repositorio>
```

---

## 3. Guardar Cambios (El Flujo Diario)
Este es el ciclo que repetirás constantemente mientras escribes código.

```bash
# 1. Mira qué archivos cambiaste o agregaste
git status

# 2. Prepara un archivo específico para guardarlo
git add <nombre-del-archivo>

# 2b. O prepara TODOS los archivos modificados a la vez
git add .

# 3. Guarda los cambios preparados con un mensaje descriptivo
git commit -m "Explicación breve de lo que hiciste"
```

---

## 4. Historial y Estado
Revisa qué ha pasado en tu proyecto.

```bash
# Muestra la lista de todos los cambios guardados (commits)
git log

# Muestra el historial en una sola línea por cambio (más limpio)
git log --oneline
```

---

## 5. Ramas (Branches)
Las ramas sirven para experimentar y trabajar en funciones nuevas sin romper el código principal.

```bash
# Lista todas las ramas locales
git branch

# Crea una rama nueva y muévete a ella de inmediato
git switch -c <nombre-de-rama>

# Cámbiate a una rama que ya existe
git switch <nombre-de-rama>

# Fusiona los cambios de otra rama en tu rama actual
git merge <nombre-de-otra-rama>

# Borra una rama que ya no necesitas
git branch -d <nombre-de-rama>
```

---

## 6. Sincronizar con GitHub (Remoto)
Envía tus cambios locales a internet o descarga lo que hicieron tus compañeros.

```bash
# Envía tus commits locales a GitHub por primera vez
git push -u origin <nombre-de-tu-rama>

# Envía tus commits si la rama ya está vinculada
git push

# Descarga y aplica los últimos cambios desde GitHub a tu computadora
git pull

# Descarga la información del servidor remoto sin modificar tu código todavía
git fetch origin
```

---

## 7. Deshacer Errores Basicos
¡No entres en pánico! Si algo sale mal, usa esto:

```bash
# Descarta los cambios no guardados en un archivo (vuelve a su estado original)
git restore <nombre-del-archivo>

# Guarda tus cambios actuales en un "cajón temporal" para limpiar tu espacio de trabajo sin borrarlos
git stash

# Recupera los cambios que guardaste en el cajón temporal
git stash pop
```
