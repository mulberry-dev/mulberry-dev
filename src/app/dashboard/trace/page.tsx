"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const CountryPrinter = () => {
  const [currentCountry, setCurrentCountry] = useState<string | null>(null)
  const [countryFlag, setCountryFlag] = useState<string | null>(null)
  const [publicIp, setPublicIp] = useState<string | null>(null)
  const [localIp, setLocalIp] = useState<string | null>(null)

  useEffect(() => {
    const obtenerUbicacion = () => {
      console.log("Obteniendo ubicación...")
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitud = position.coords.latitude
            const longitud = position.coords.longitude

            fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`
            )
              .then((response) => response.json())
              .then((data) => {
                const pais = data.address.country
                setCurrentCountry(pais)

                // Fetch country flag based on country code
                fetch(`https://restcountries.com/v3.1/name/${pais}`)
                  .then((response) => response.json())
                  .then((data) => {
                    const flag =
                      data[0]?.flags && data[0]?.flags.svg
                        ? data[0].flags.svg
                        : null
                    setCountryFlag(flag)
                  })
                  .catch((error) => {
                    console.error("Error al obtener la bandera:", error.message)
                  })
              })
              .catch((error) => {
                console.error("Error al obtener la ubicación:", error.message)
              })
          },
          function (error) {
            console.error("Error al obtener la ubicación:", error.message)
          }
        )
      } else {
        console.error("Geolocalización no soportada por este navegador")
      }
    }

    const obtenerDetallesNavegador = () => {
      const navegador = window?.navigator
    }

    const obtenerIpPublica = () => {
      fetch("https://api64.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
          const ip = data.ip
          setPublicIp(ip)
        })
        .catch((error) => {
          console.error("Error al obtener la IP pública:", error.message)
        })
    }

    const obtenerIpLocal = () => {
      fetch("https://api64.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
          const ip = data.ip
          setLocalIp(ip)
          console.log("IP Local:", ip)
        })
        .catch((error) => {
          console.error("Error al obtener la IP local:", error.message)
        })
    }

    obtenerUbicacion()
    obtenerDetallesNavegador()
    obtenerIpPublica()
    obtenerIpLocal()
  }, []) // Empty dependency array ensures that this effect runs once, similar to componentDidMount

  return (
    <section>
      <h2>Detalles:</h2>
      {currentCountry && (
        <p>
          País actual: {currentCountry}{" "}
          {countryFlag && (
            <Image
              src={countryFlag}
              width={30}
              height={30}
              alt={`${currentCountry} flag`}
            />
          )}
        </p>
      )}
      <p>Nombre del navegador: {window?.navigator.appName}</p>
      <p>Versión del navegador: {window?.navigator.appVersion}</p>
      <p>Idioma preferido: {window?.navigator.language}</p>
      <p>Plataforma del sistema: {window?.navigator.platform}</p>
      <p>User Agent: {window?.navigator.userAgent}</p>
      {publicIp && <p>IP Pública: {publicIp}</p>}
      {localIp && <p>IP Local: {localIp}</p>}
    </section>
  )
}

export default CountryPrinter
