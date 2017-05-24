import Module from 'Parser/Core/Module';

const debug = false;
const DEVOTION_AURA_BUFF_ID = 210320;
const PROTECTION_OF_TYR_BUFF_ID = 211210;

class DevotionAura extends Module {
  healing = 0;

  log = [];

  on_damage(event) {
    this.log.push(event);
  }

  on_finished() {
    this.log.forEach((event) => {
      const combatant = this.owner.combatants.players[event.targetID];
      if (combatant && combatant.hasBuff(PROTECTION_OF_TYR_BUFF_ID, event.timestamp)) {
        console.log(combatant.hasBuff(PROTECTION_OF_TYR_BUFF_ID, event.timestamp), combatant.hasBuff(DEVOTION_AURA_BUFF_ID, event.timestamp), event.timestamp, event.targetID);
      }
      if (!combatant || !combatant.hasBuff(DEVOTION_AURA_BUFF_ID, event.timestamp)) {
        return;
      }

      const affectedPlayers = Object.keys(this.owner.combatants.players).map(key => this.owner.combatants.players[key]).filter(combatant => combatant.hasBuff(DEVOTION_AURA_BUFF_ID, event.timestamp) && combatant.id !== this.owner.playerId).length + 1;
      // we are always affected ourselves, but this won't always show in the logs since the combatlog has a bug where auras that are never removed or applied during combat aren't logged

      const damageTaken = event.amount + (event.absorbed || 0);

      const currentReductionPercentage = combatant.hasBuff(PROTECTION_OF_TYR_BUFF_ID, event.timestamp) ? 0.2 : 0.2 / affectedPlayers;

      const originalDamageTaken = damageTaken / (1 - currentReductionPercentage);
      const reduction = originalDamageTaken - damageTaken;

      this.healing += reduction;

      console.log(this.healing.toFixed(0), reduction.toFixed(0), affectedPlayers, event.timestamp, event.targetID);
    })
  }
}

export default DevotionAura;
