/**
 * Cloudinary Media Utility
 * Cloud Name : devxtoev9
 * API Key    : 783798538128913
 *
 * IMPORTANT: The API Secret must NEVER be used in frontend code.
 * All signed uploads / admin operations must go through your backend / CMS.
 *
 * Usage:
 *   import { cloudinaryUrl, cloudinaryVideoUrl } from '../utils/cloudinary';
 *
 *   // Image (auto format + quality, resize to 400×400)
 *   const src = cloudinaryUrl('team/john-founder', { width: 400, height: 400, crop: 'fill' });
 *
 *   // Video
 *   const videoSrc = cloudinaryVideoUrl('office/intro-reel');
 */

const CLOUD_NAME =
  (import.meta.env as Record<string, string>).VITE_CLOUDINARY_CLOUD_NAME ?? 'devxtoev9';

const BASE_IMAGE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
const BASE_VIDEO_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;

// ─── Types ────────────────────────────────────────────────────────────────────

export type CloudinaryGravity =
  | 'auto'
  | 'face'
  | 'faces'
  | 'center'
  | 'north'
  | 'south'
  | 'east'
  | 'west';

export type CloudinaryCrop =
  | 'fill'
  | 'fit'
  | 'limit'
  | 'crop'
  | 'thumb'
  | 'scale'
  | 'pad'
  | 'auto';

export interface CloudinaryImageOptions {
  /** Target width in pixels */
  width?: number;
  /** Target height in pixels */
  height?: number;
  /** Cropping mode (default: 'fill') */
  crop?: CloudinaryCrop;
  /** Gravity for cropping (default: 'auto') */
  gravity?: CloudinaryGravity;
  /** Output quality 1-100 or 'auto' (default: 'auto') */
  quality?: number | 'auto';
  /** Output format or 'auto' (default: 'auto') */
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  /** Any extra raw transformation string, e.g. 'e_sharpen' */
  extra?: string;
}

export interface CloudinaryVideoOptions {
  /** Target width in pixels */
  width?: number;
  /** Target height in pixels */
  height?: number;
  /** Video quality 1-100 or 'auto' (default: 'auto') */
  quality?: number | 'auto';
  /** Output format (default: 'auto') */
  format?: 'auto' | 'mp4' | 'webm';
  /** Any extra raw transformation string, e.g. 'e_loop' */
  extra?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Build a Cloudinary image URL with optional transformations.
 *
 * @param publicId  Cloudinary public ID, e.g. 'team/john-founder'
 * @param options   Optional transformations
 * @returns         Full delivery URL
 *
 * @example
 *   cloudinaryUrl('team/john-founder', { width: 400, height: 400, crop: 'fill', gravity: 'face' })
 *   // → https://res.cloudinary.com/devxtoev9/image/upload/c_fill,g_face,h_400,q_auto,f_auto,w_400/team/john-founder
 */
export function cloudinaryUrl(publicId: string, options: CloudinaryImageOptions = {}): string {
  const {
    width,
    height,
    crop = 'fill',
    gravity = 'auto',
    quality = 'auto',
    format = 'auto',
    extra,
  } = options;

  const parts: string[] = [];

  if (width || height || crop !== 'fill') {
    if (crop) parts.push(`c_${crop}`);
    if (gravity) parts.push(`g_${gravity}`);
    if (height) parts.push(`h_${height}`);
    if (width) parts.push(`w_${width}`);
  }

  parts.push(`q_${quality}`);
  parts.push(`f_${format}`);

  if (extra) parts.push(extra);

  const transformation = parts.join(',');
  return `${BASE_IMAGE_URL}/${transformation}/${publicId}`;
}

/**
 * Build a Cloudinary video URL with optional transformations.
 *
 * @param publicId  Cloudinary public ID, e.g. 'office/intro-reel'
 * @param options   Optional transformations
 * @returns         Full delivery URL
 *
 * @example
 *   cloudinaryVideoUrl('office/intro-reel', { width: 1280, quality: 'auto' })
 */
export function cloudinaryVideoUrl(publicId: string, options: CloudinaryVideoOptions = {}): string {
  const { width, height, quality = 'auto', format = 'auto', extra } = options;

  const parts: string[] = [];

  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  parts.push(`q_${quality}`);
  parts.push(`f_${format}`);

  if (extra) parts.push(extra);

  const transformation = parts.join(',');
  return `${BASE_VIDEO_URL}/${transformation}/${publicId}`;
}

/**
 * Build a Cloudinary thumbnail from a video public ID.
 *
 * @param publicId   Cloudinary video public ID
 * @param options    Optional transformations applied to the thumbnail
 * @returns          Full image delivery URL (poster frame)
 */
export function cloudinaryVideoThumbnail(
  publicId: string,
  options: CloudinaryImageOptions = {}
): string {
  const {
    width,
    height,
    crop = 'fill',
    gravity = 'auto',
    quality = 'auto',
    format = 'auto',
  } = options;

  const parts: string[] = [];
  if (crop) parts.push(`c_${crop}`);
  if (gravity) parts.push(`g_${gravity}`);
  if (height) parts.push(`h_${height}`);
  if (width) parts.push(`w_${width}`);
  parts.push(`q_${quality}`);
  parts.push(`f_${format}`);

  const transformation = parts.join(',');
  // Use /video/upload with so= (start offset) = 0 and format jpg to extract a poster frame
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformation}/so_0/${publicId}.jpg`;
}

/**
 * Resolve a team member image filename to a Cloudinary URL.
 * Assumes team photos are stored in the "team/" folder on Cloudinary.
 *
 * @param filename  e.g. 'john-founder.jpg' or 'gowtham.webp'
 * @param size      Square size in pixels (default 320)
 */
export function teamMemberImageUrl(filename: string, size = 320): string {
  // Strip extension and query parameters if any
  const withoutQuery = filename.split('?')[0];
  const cleanFilename = withoutQuery.replace(/\.[^.]+$/, '');
  // Avoid double-prefixing if the input already starts with 'team/'
  const publicId = cleanFilename.startsWith('team/') ? cleanFilename : `team/${cleanFilename}`;
  return cloudinaryUrl(publicId, {
    width: size,
    height: size,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Returns the Cloudinary cloud name currently configured.
 */
export function getCloudName(): string {
  return CLOUD_NAME;
}
