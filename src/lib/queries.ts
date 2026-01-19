import { createClient } from "@sanity/client";
import groq from "groq";
import { apiVersion, dataset, projectId, sanityClient } from "./sanity.client";
import type { AboutPage, Announcement, Event, Faculty, GalleryItem, Notice, SiteSettings } from "./types";

const noticeFields = `
  _id,
  title,
  content,
  category,
  priority,
  pin,
  "pdfUrl": pdf.asset->url,
  author,
  publishedAt
`;

export async function fetchPinnedNotices(): Promise<Notice[]> {
  return sanityClient.fetch(
    groq`*[_type == "notice" && pin == true] | order(publishedAt desc)[0...4]{${noticeFields}}`
  );
}

export async function fetchRecentNotices(): Promise<Notice[]> {
  return sanityClient.fetch(
    groq`*[_type == "notice"] | order(publishedAt desc)[0...10]{${noticeFields}}`
  );
}

export async function fetchNoticeById(id: string): Promise<Notice | null> {
  try {
    const notice = await sanityClient.fetch(
      groq`*[_type == "notice" && _id == $id][0]{${noticeFields}}`,
      { id }
    );
    return notice || null;
  } catch (error) {
    console.error("Error fetching notice by ID:", error);
    return null;
  }
}

export async function fetchEvents(): Promise<Event[]> {
  return sanityClient.fetch(
    groq`*[_type == "event"] | order(date asc){
      _id,
      title,
      description,
      date,
      category,
      location
    }`
  );
}

export async function fetchEventById(id: string): Promise<Event | null> {
  try {
    const event = await sanityClient.fetch(
      groq`*[_type == "event" && _id == $id][0]{
        _id,
        title,
        description,
        date,
        category,
        location
      }`,
      { id }
    );
    return event || null;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return null;
  }
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  return sanityClient.fetch(
    groq`*[_type == "gallery"] | order(_createdAt desc){
      _id,
      title,
      "imageUrl": image.asset->url,
      category
    }`
  );
}

export async function fetchAbout(): Promise<AboutPage | null> {
  return sanityClient.fetch(
    groq`*[_type == "about"][0]{
      _id,
      heading,
      body,
      "heroImage": heroImage.asset->url
    }`
  );
}

export async function fetchSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(
    groq`*[_type == "siteSettings"][0]{
      _id,
      schoolName,
      tagline,
      contactEmail,
      contactPhone,
      address,
      heroDescription
    }`
  );
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  try {
    // Create a fresh client without CDN for real-time announcements
    const freshClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false // Bypass CDN cache for immediate updates
    });

    const result = await freshClient.fetch(
      groq`*[_type == "announcement" && active == true] | order(priority asc){
        _id,
        title,
        description,
        icon,
        link,
        priority,
        active
      }`
    );
    return result || [];
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}

export async function fetchFaculties(): Promise<Faculty[]> {
  try {
    const result = await sanityClient.fetch(
      groq`*[_type == "faculty"] | order(order asc, name asc){
        _id,
        name,
        designation,
        "photoUrl": photo.asset->url,
        mobileNumber,
        email,
        subject,
        order,
        featured
      }`
    );
    return result || [];
  } catch (error) {
    console.error("Error fetching faculties:", error);
    return [];
  }
}

export async function fetchFeaturedFaculties(): Promise<Faculty[]> {
  try {
    const result = await sanityClient.fetch(
      groq`*[_type == "faculty" && featured == true] | order(order asc, name asc)[0...3]{
        _id,
        name,
        designation,
        "photoUrl": photo.asset->url,
        mobileNumber,
        email,
        subject,
        order,
        featured
      }`
    );
    return result || [];
  } catch (error) {
    console.error("Error fetching featured faculties:", error);
    return [];
  }
}
