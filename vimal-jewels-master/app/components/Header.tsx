"use client";
import { HeaderCartIcon } from "@/components/header-cart-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserDropdown } from "@/components/user-dropdown";
import { ChevronDown, FileText, Headset, Heart, MapPin, Menu, Search, Store, Truck } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    "BESTSELLERS",
    "NEW ARRIVALS", 
    "RINGS",
    "EARRINGS",
    "NECKLACE",
    "BANGLES & BRACELETS",
    "SOLITAIRES",
    "MANGALSUTRAS & PENDANTS",
    "OTHER JEWELLERY",
    "GIFTS",
  ];

  const megaMenuData = {
    EARRINGS: {
      shopByStyle: [
        { name: "STUDS", icon: "💎" },
        { name: "JHUMKA", icon: "👂" },
        { name: "DANGLES", icon: "💫" },
        { name: "HOOPS", icon: "⭕" },
        { name: "SUI DHAGA", icon: "✨" },
        { name: "SOLITAIRE", icon: "💍" },
        { name: "NAVRATNA", icon: "🌈" },
      ],
      shopByMaterial: [
        { name: "DIAMOND", icon: "💎" },
        { name: "PLATINUM", icon: "⚪" },
        { name: "GEMSTONE", icon: "🔮" },
        { name: "GOLD", icon: "🟡" },
      ],
      shopFor: [
        "UNDER ₹10K",
        "₹10K - ₹20K", 
        "₹20K - ₹30K",
        "₹30K - ₹50K",
        "₹50K - ₹75K",
        "ABOVE ₹75K",
        "WOMEN",
        "MEN",
        "KIDS",
      ],
      shopByOccasion: [
        { name: "DAILY WEAR", icon: "☀️" },
        { name: "CASUAL OUTINGS", icon: "👥" },
        { name: "FESTIVE", icon: "🎉" },
        { name: "ANNIVERSARY", icon: "💕" },
        { name: "WEDDING", icon: "💒" },
      ],
    },
    RINGS: {
      shopByStyle: [
        { name: "SOLITAIRE", icon: "💍" },
        { name: "BAND RINGS", icon: "💫" },
        { name: "COCKTAIL", icon: "🍸" },
        { name: "ETERNITY", icon: "♾️" },
        { name: "STACKABLE", icon: "📚" },
      ],
      shopByMaterial: [
        { name: "DIAMOND", icon: "💎" },
        { name: "PLATINUM", icon: "⚪" },
        { name: "GEMSTONE", icon: "🔮" },
        { name: "GOLD", icon: "🟡" },
      ],
      shopFor: [
        "UNDER ₹10K",
        "₹10K - ₹20K",
        "₹20K - ₹30K", 
        "₹30K - ₹50K",
        "₹50K - ₹75K",
        "ABOVE ₹75K",
        "WOMEN",
        "MEN",
        "KIDS",
      ],
      shopByOccasion: [
        { name: "ENGAGEMENT", icon: "💍" },
        { name: "WEDDING", icon: "💒" },
        { name: "ANNIVERSARY", icon: "💕" },
        { name: "DAILY WEAR", icon: "☀️" },
        { name: "PARTY", icon: "🎉" },
      ],
    },
    NECKLACE: {
      shopByStyle: [
        { name: "CHOKER", icon: "💎" },
        { name: "PENDANT", icon: "🔗" },
        { name: "CHAIN", icon: "⛓️" },
        { name: "STATEMENT", icon: "✨" },
        { name: "LAYERED", icon: "📚" },
      ],
      shopByMaterial: [
        { name: "DIAMOND", icon: "💎" },
        { name: "PLATINUM", icon: "⚪" },
        { name: "GEMSTONE", icon: "🔮" },
        { name: "GOLD", icon: "🟡" },
      ],
      shopFor: [
        "UNDER ₹10K",
        "₹10K - ₹20K",
        "₹20K - ₹30K",
        "₹30K - ₹50K", 
        "₹50K - ₹75K",
        "ABOVE ₹75K",
        "WOMEN",
        "MEN",
        "KIDS",
      ],
      shopByOccasion: [
        { name: "WEDDING", icon: "💒" },
        { name: "FESTIVE", icon: "🎉" },
        { name: "PARTY", icon: "🍾" },
        { name: "DAILY WEAR", icon: "☀️" },
        { name: "OFFICE", icon: "💼" },
      ],
    },
  };

  const renderMegaMenu = (category: string) => {
    const menuData = megaMenuData[category as keyof typeof megaMenuData];
    if (!menuData) return null;

    return (
      <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-5 gap-8">
            {/* Shop by Style */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#FADDA0]">
                SHOP BY STYLE
              </h3>
              <div className="space-y-3">
                {menuData.shopByStyle.map((item) => (
                  <Link
                    key={item.name}
                    href={`/category/${item.name.toLowerCase().replace(/ /g, '-')}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 text-sm"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Shop by Material */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#FADDA0]">
                SHOP BY MATERIAL
              </h3>
              <div className="space-y-3">
                {menuData.shopByMaterial.map((item) => (
                  <Link
                    key={item.name}
                    href={`/category/${item.name.toLowerCase()}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 text-sm"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Shop For */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#FADDA0]">
                SHOP FOR
              </h3>
              <div className="space-y-3">
                {menuData.shopFor.map((item) => (
                  <Link
                    key={item}
                    href={`/category/${item.toLowerCase().replace(/[₹\s-]/g, '')}`}
                    className="block text-gray-600 hover:text-gray-900 text-sm"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Shop by Occasion */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#FADDA0]">
                SHOP BY OCCASION
              </h3>
              <div className="space-y-3">
                {menuData.shopByOccasion.map((item) => (
                  <Link
                    key={item.name}
                    href={`/category/${item.name.toLowerCase().replace(/ /g, '-')}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 text-sm"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Product */}
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg p-6 text-white">
              <div className="mb-4">
                <Image
                  src="https://www.candere.com/media/jewellery/images/C022008_1.jpg"
                  alt="Featured Earrings"
                  width={120}
                  height={120}
                  className="mx-auto rounded-lg"
                />
              </div>
              <p className="text-sm mb-4 text-center">
                Subtle and glamorous {category.toLowerCase()} to complete your outfit!
              </p>
              <Link
                href={`/category/${category.toLowerCase()}/all`}
                className="block text-center text-sm font-medium underline hover:no-underline"
              >
                VIEW ALL DESIGNS
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="bg-black text-white py-2 px-4 md:px-8 flex justify-between items-center text-xs">
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-1 text-gray-400 hover:text-white"
          >
            <Truck className="w-3 h-3" />
            <span>ORDER TRACKING</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-1 text-gray-400 hover:text-white"
          >
            <Headset className="w-3 h-3" />
            <span>CONTACT US</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 text-gray-400 hover:text-white"
          >
            <FileText className="w-3 h-3" />
            <span>BLOG</span>
          </Link>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-black py-4 px-4 md:px-8 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-white flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="Vimal Jewellers Logo"
              width={60}
              height={60}
              className="object-cover h-auto "
              // Adjust object position to show SRK
              priority
            />
            <span className="block text-xs mt-0.5 font-normal text-gray-400">
              VIMAL JEWELLERS
            </span>
          </Link>
          <div className="relative hidden md:block w-80">
            <Input
              type="search"
              placeholder="Search for Under 20k Earrings"
              className="pl-10 pr-4 py-2 rounded-full bg-gray-800 border border-[#FADDA0] focus:ring-0 focus:border-[#FADDA0] text-white placeholder-gray-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FADDA0]" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <MapPin className="w-5 h-5 text-[#FADDA0]" />
            <span className="sr-only">Pincode</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Store className="w-5 h-5 text-[#FADDA0]" />
            <span className="sr-only">Store Locator</span>
          </Button>
          <UserDropdown />
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Heart className="w-5 h-5 text-[#FADDA0]" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
            <span className="sr-only">Wishlist</span>
          </Button>
          <HeaderCartIcon />
        </div>
      </nav>

      {/* Category Navigation with Mega Menu */}
      <div className="bg-black py-3 px-4 md:px-8 border-b border-gray-800 relative">
        <div className="flex justify-center overflow-x-auto whitespace-nowrap scrollbar-hide">
          {categories.map((item) => (
            <div
              key={item}
              className="relative"
              onMouseEnter={() => setHoveredCategory(item)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                href={`/category/${item
                  .toLowerCase()
                  .replace(/ & /g, "-")
                  .replace(/ /g, "-")}`}
                className={`px-3 py-1 text-xs font-medium block ${
                  item === "NEW ARRIVALS"
                    ? "text-[#FADDA0]"
                    : "text-white hover:text-gray-300"
                }`}
              >
                {item}
              </Link>
            </div>
          ))}
          <Button
            variant="outline"
            className="border-[#FADDA0] text-[#FADDA0] px-3 py-1 text-xs font-medium rounded-md ml-4 bg-transparent"
          >
            OFFERS
          </Button>
          <Button
            variant="outline"
            className="border-[#FADDA0] text-[#FADDA0] px-3 py-1 text-xs font-medium rounded-md ml-2 flex items-center bg-transparent"
          >
            FEATURES <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>

        {/* Mega Menu */}
        {hoveredCategory && (
          <div
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {renderMegaMenu(hoveredCategory)}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
