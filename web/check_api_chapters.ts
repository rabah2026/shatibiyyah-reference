
import { DataService } from './lib/data';

console.log("--- Checking Chapters API ---");

const allChapters = DataService.getChapters();
console.log(`Total Chapters: ${allChapters.length}`);

if (allChapters.length > 0) {
    console.log("First Chapter:", allChapters[0]);
    console.log("Last Chapter:", allChapters[allChapters.length - 1]);
}

const verse100 = 100;
const ch100 = DataService.getChapterByVerse(verse100);
console.log(`Chapter for verse ${verse100}:`, ch100?.name);

const ch1Bayts = DataService.getBaytsByChapterId(1);
console.log(`Bayts in Chapter 1: ${ch1Bayts.length}`);
console.log(`First bayt in Ch1:`, ch1Bayts[0]);
console.log(`Last bayt in Ch1:`, ch1Bayts[ch1Bayts.length - 1]);

const chLastBayts = DataService.getBaytsByChapterId(allChapters.length);
console.log(`Bayts in Last Chapter (${allChapters.length}): ${chLastBayts.length}`);
