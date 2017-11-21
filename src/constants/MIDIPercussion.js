import { PercussionPathConfig } from '../config/percussion-path';

export const PERCUSSION_PATH =
  `${PercussionPathConfig.URL}:${PercussionPathConfig.PORT}/${PercussionPathConfig.SET}`;

export const PERCUSSION_FILETYPE = 'wav';
export const PERCUSSION_CHANNEL = 9;
export const PERCUSSION_VOLUME = 0.2; // FIXME
export const DEFAULT_PROGRAM_NUMBER = 62;

export const MIDIPercussion = {
  35: 'acoustic_bass_drum',
  36: 'bass_drum_1',
  37: 'side_stick',
  38: 'acoustic_snare',
  39: 'hand_clap',
  40: 'electric_snare',
  41: 'low_floor_tom',
  42: 'closed_high_hat',
  43: 'high_floor_tom',
  44: 'pedal_hi_hat',
  45: 'low_tom',
  46: 'open_hi_hat',
  47: 'low_mid_tom',
  48: 'hi_mid_tom',
  49: 'crash_cymbal_1',
  50: 'high_tom',
  51: 'ride_cymbal_1',
  52: 'chinese_cymbal',
  53: 'ride_bell',
  54: 'tambourine',
  55: 'splash_cymbal',
  56: 'cowbell',
  57: 'crash_cymbal_2',
  58: 'vibraslap',
  59: 'ride_cymbal_2',
  60: 'high_bongo',
  61: 'low_bongo',
  62: 'mute_high_conga',
  63: 'open_high_conga_stereo',
  64: 'low_conga',
  65: 'high_timbale',
  66: 'low_timbale',
  67: 'high_agogo',
  68: 'low_agogo',
  69: 'cabasa',
  70: 'maracas',
  71: 'short_whistle',
  72: 'long_whistle',
  73: 'short_guiro',
  74: 'long_guiro',
  75: 'claves',
  76: 'hi_woodblock',
  77: 'low_woodblock',
  78: 'mute_cuica',
  79: 'open_cuica',
  80: 'mute_triangle',
  81: 'open_triagle'
};
