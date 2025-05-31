// https://www.startswithy.com/adjectives-for-demeanor/
// Approachable – Easy to talk to; welcoming.
//
// Calm – Relaxed and steady, even under pressure.
//
// Confident – Self-assured without arrogance.
//
// Compassionate – Kind and empathetic toward others.
//
// Courteous – Polite and respectful.
//
// Friendly – Warm, pleasant, and kind to others.
//
// Genuine – Honest, sincere, and authentic.
//
// Gracious – Elegant and kind, even in difficult situations.
//
// Optimistic – Positive and hopeful about the future.
//
// Patient – Calm and understanding, even when faced with challenges.
//
// Poised – Graceful, composed, and in control.
//
// Respectful – Polite and considerate of others.
//
// Sincere – Authentic and heartfelt in communication.
//
// Supportive – Encouraging and helpful toward others.
//
// Warm – Kind and inviting, creating a sense of comfort.
//
// Wise – Thoughtful and insightful, offering good judgment.

// negatives:
// Aloof – Emotionally distant and unapproachable.
//
// Arrogant – Overly self-important and dismissive of others.
//
// Belligerent – Aggressive and eager to argue or fight.
//
// Condescending – Talking down to others in a patronizing way.
//
// Defensive – Overly sensitive to criticism or perceived attacks.
//
// Dismissive – Treating others or their ideas as unworthy of consideration.
//
// Grumpy – Easily irritated and prone to complaining.
//
// Hostile – Openly aggressive or unfriendly.
//
// Impatient – Lacking tolerance, easily frustrated.
//
// Indifferent – Uncaring or uninterested.
//
// Intimidating – Creating fear or discomfort in others.
//
// Judgmental – Quick to criticize or disapprove.
//
// Moody – Unpredictably changing moods, often sulky.
//
// Overbearing – Domineering and excessively controlling.
//
// Rude – Lacking courtesy or respect.
//
// Standoffish – Distant and reluctant to engage.
//
// Sullen – Gloomy, resentful, or sulky.
//
// Tense – On edge, anxious, and unable to relax.
//
// Unapproachable – Giving off signals that discourage interaction.
//
// Withdrawn – Detached, reserved, or avoiding engagement.
//
// neutral
//Serious – Focused and thoughtful; not always negative, but can seem distant or formal.
//
// Reserved – Quiet, holding back thoughts; can seem private or shy, but not necessarily unfriendly.
//
// Quiet – Speaking little; not always positive or negative—it depends on the situation.
//
// Formal – Polite and following etiquette; can feel distant or appropriate, depending on context.
//
// Stoic – Showing little emotion outwardly; seen as strong by some, cold by others.
//
// Matter-of-Fact – Stating facts plainly, without emotion or embellishment.
//
// Blunt – Direct and to the point; can be helpful or hurtful depending on tone and context.
//
// Detached – Not emotionally involved; can be helpful in some situations (objective), or seem distant.
//
// Pragmatic – Focused on practical outcomes; neutral, depending on how it’s perceived.
//
// Apathetic – Lacking strong emotion or interest; can be seen as neutral or negative depending on context.
//
// Unflappable – Not easily upset; calm and steady, but could seem unemotional.
//
// Dry – Subtle in expression, especially with humor; can feel understated or dull.
//
// Cautious – Careful, considering risks; wise in some situations, hesitant in others.
//
// Passive – Not taking initiative or leadership; could be neutral, positive, or negative.
//
// Predictable – Acting consistently; seen as reliable or boring, depending on context.
import { MongoDocument } from './MongoDocument.js';
import { IPersonality } from './Personality.js';

export enum EDemeanor {
  // positives
  Approachable= 'approachable',
  Confident= 'confident',
  Compassionate= 'compassionate',
  Courteous= 'courteous',
  Friendly= 'friendly',
  Genuine= 'genuine',
  Gracious= 'gracious',
  Optimistic= 'optimistic',
  Patient= 'patient',
  Poised= 'poised',
  Respectful= 'respectful',
  Supportive= 'supportive',
  Warm= 'warm',
  // negatives
  Aloof= 'aloof',
  Arrogant= 'arrogant',
  Belligerent= 'belligerent',
  Condescending= 'condescending',
  Defensive= 'defensive',
  Dismissive= 'dismissive',
  Grumpy= 'grumpy',
  Hostile= 'hostile',
  Impatient= 'impatient',
  Indifferent= 'indifferent',
  Intimidating= 'intimidating',
  Judgmental= 'judgmental',
  Moody= 'moody',
  Overbearing= 'overbearing',
  Rude= 'rude',
  Standoffish= 'standoffish',
  Sullen= 'sullen',
  Tense= 'tense',
  Unapproachable= 'unapproachable',
  Withdrawn= 'withdrawn',
  // neutral
  Serious= 'serious',
  Reserved= 'reserved',
  Quiet= 'quiet',
  Formal= 'formal',
  Stoic= 'stoic',
  MatterOfFact= 'matter-of-fact',
  Blunt= 'blunt',
  Detached= 'detached',
  Pragmatic= 'pragmatic',
  Apathetic= 'apathetic',
  Unflappable= 'unflappable',
  Dry= 'dry',
  Cautious= 'cautious',
  Passive= 'passive',
  Predictable= 'predictable',
}

// https://blaze.today/blog/tone-of-voice-examples/#authoritative
export enum ETone {
  Authoritative = 'authoritative',
  Edgy = 'edgy',
  Casual = 'casual',
  Confident = 'confident',
  Straightforward = 'straightforward',
  Inspirational = 'inspirational',
  Friendly = 'friendly',
  Formal = 'formal',
  Quirky = 'quirky',
  Optimistic = 'optimistic',
  Humorous = 'humorous',
  Trendy = 'trendy',
  Informative = 'informative',
  Questioning = 'questioning',
  Joyful = 'joyful',
}

//Levels of Enthusiasm
// Apathetic – Completely uninterested, no energy or engagement.
//
// Mildly Interested – A small spark of interest, but not very engaged.
//
// Somewhat Engaged – Paying attention, but not fully committed.
//
// Curious – Open to learning more, showing interest.
//
// Eager – Ready to take action, motivated.
//
// Excited – Feeling energized and enthusiastic about the topic.
//
// Passionate – Deeply invested and motivated.
//
// Zealous – Extremely enthusiastic, actively involved, and vocal.
//
// Overjoyed – Exuberant, almost giddy with excitement.
//
// Ecstatic – Bursting with energy, fully immersed and thrilled.
export enum EEnthusiasm {
  Apathetic= 'apathetic',
  MildlyInterested= 'mildly interested',
  SomewhatEngaged= 'somewhat engaged',
  Curious= 'curious ',
  Eager= 'eager',
  Excited= 'excited ',
  Passionate= 'passionate',
  Zealous= 'zealous',
  Overjoyed= 'overjoyed',
  Ecstatic= 'ecstatic ',
}

// Casual / Slang – Extremely informal, often using slang, abbreviations, and relaxed grammar.
// Example: "Yo, what’s up? Let’s grab some grub!"
//
// Informal / Friendly – Conversational, relaxed tone, but generally avoids slang or excessive abbreviations.
// Example: "Hey! How’s it going? Want to meet up later?"
//
// Neutral – Polite, everyday language. Suitable for most situations that don’t require special formality.
// Example: "Hi, how are you? Let’s chat sometime soon."
//
// Formal – Professional, respectful tone. Appropriate for workplace settings or unfamiliar audiences.
// Example: "Good afternoon. I hope you’re doing well. Please let me know if you’re available for a discussion."
//
// Highly Formal / Academic – Very structured, polished language, often used in academic writing, official communication, or ceremonial contexts.
// Example: "It is a pleasure to make your acquaintance. I would be most appreciative if you could provide further clarification on this matter at your earliest convenience."
//
// also: https://www.appgecet.co.in/the-five-levels-of-formality-in-language-understanding-communication-styles/
export enum EFormality {
  Casual= 'casual',
  Conversational= 'conversational',
  Neutral= 'neutral',
  Formal= 'formal  ',
  Academic= 'academic',
}

export interface IPersona extends MongoDocument {
  name: string;
  personality: IPersonality;
  task: string;
  demeanor: string[];
  enthusiasm: EEnthusiasm;
  formality: EFormality;
  tone: string[];
  voiceAffect: string[];
  pacing: string[];
  emotion: string[];
  pronunciation: string[];
  pauses: string[];
  updatedAt?: Date
}
