<script setup lang="ts">
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-vue-next'
</script>

<template>
  <footer id="contact" class="bg-black text-stone-300 border-t border-stone-800 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand & Socials -->
        <div class="space-y-4">
          <div class="flex flex-col">
            <span class="font-serif text-2xl font-bold tracking-widest text-white uppercase">
              DIBU
            </span>
            <span class="text-[10px] tracking-[0.35em] text-stone-400 uppercase -mt-1">
              XXTENSIONS
            </span>
          </div>
          <p class="text-xs text-stone-400 leading-relaxed">
            Redefining beauty and luxury through premium hair extensions, salon artistry, and professional styling essentials.
          </p>
          <!-- Social Icons -->
          <div class="flex items-center space-x-3 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition"
              aria-label="Facebook"
            >
              <Facebook class="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition"
              aria-label="Instagram"
            >
              <Instagram class="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition"
              aria-label="YouTube"
            >
              <Youtube class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-white mb-4">
            Quick Links
          </h4>
          <ul class="space-y-2.5 text-xs text-stone-400">
            <li>
              <router-link to="/" class="hover:text-white transition">Home</router-link>
            </li>
            <li>
              <a href="/#about" class="hover:text-white transition">About</a>
            </li>
            <li>
              <router-link to="/services" class="hover:text-white transition">Our Services</router-link>
            </li>
            <li>
              <router-link to="/products" class="hover:text-white transition">Products Catalogue</router-link>
            </li>
            <li>
              <router-link to="/cart" class="hover:text-white transition">Shopping Cart</router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Us -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-white mb-4">
            Contact Us
          </h4>
          <ul class="space-y-3 text-xs text-stone-400">
            <li class="flex items-center gap-2">
              <Phone class="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
              <span>(+1) 234 756 8710</span>
            </li>
            <li class="flex items-center gap-2">
              <Mail class="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
              <span>support@dibu-xxtensions.com</span>
            </li>
            <li class="flex items-start gap-2">
              <MapPin class="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
              <span>Trenton West Valley, 12 St Bowling Road, Akron, Ohio, 44312</span>
            </li>
          </ul>
        </div>

        <!-- Work Hours -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-white mb-4">
            Work Hours
          </h4>
          <ul class="space-y-2 text-xs text-stone-400">
            <li class="flex justify-between">
              <span>Mon - Fri:</span>
              <span class="text-white">09:00 AM - 07:00 PM</span>
            </li>
            <li class="flex justify-between">
              <span>Saturday:</span>
              <span class="text-white">09:00 AM - 05:00 PM</span>
            </li>
            <li class="flex justify-between">
              <span>Sunday:</span>
              <span class="text-rose-400">Closed</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
        <p>© 2026 DIBU XXTENSIONS & NovaCart. All Rights Reserved. CS3404 GUI Programming Mini Project.</p>
        <div class="flex items-center space-x-6">
          <router-link to="/products" class="hover:text-stone-300 transition">Catalogue</router-link>
          <router-link to="/bookmarks" class="hover:text-stone-300 transition">Wishlist</router-link>
          <router-link to="/login" class="hover:text-stone-300 transition">Account</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
