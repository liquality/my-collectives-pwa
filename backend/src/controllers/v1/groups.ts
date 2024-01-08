import { RequestHandler } from "express";
import { GroupsService } from "../../services/groups";
import { AuthService } from "../../services/auth";

export class GroupsController {
  public findByUserAddress: RequestHandler = async (req, res) => {
    const { address } = req.params;

    if (!address) {
      res.status(400).send({ error: "address is required" });
    } else {
      try {
        const groups = await GroupsService.findByUserAddress(address);

        res.status(200).send(groups);
      } catch (err: any) {
        console.log(err, 'ERROR?')
        res.status(500).send({ error: err.message });
      }
    }
  };

  public findByChallenge: RequestHandler = async (req, res) => {
    const { challengeId } = req.params;

    if (!challengeId) {
      res.status(400).send({ error: "challenge is required" });
    } else {
      try {
        const groups = await GroupsService.findByChallenge(challengeId);

        res.status(200).send(groups);
      } catch (err: any) {
        res.status(500).send({ error: err.message });
      }
    }
  };

  public find: RequestHandler = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ error: "id is required" });
    } else {
      try {
        const user = await AuthService.find((req as any).auth?.sub);
        const group = await GroupsService.find(id, user.id);

        if (!group) {
          res.status(404).send({ error: "group not found" });
        } else {
          res.status(200).send(group);
        }
      } catch (err: any) {
        res.status(500).send({ error: err.message });
      }
    }
  };

  public create: RequestHandler = async (req, res) => {
    const { group, pools } = req.body;

    const user = await AuthService.find((req as any).auth?.sub);
    console.log(user, "wats user?", (req as any).auth?.sub);
    if (!group.name) {
      res.status(400).send({ error: "name is required" });
    } else {
      try {
        const createdGroup = await GroupsService.create(group, pools, user.id);

        if (!createdGroup) {
          throw new Error("Group not created");
        }

        res.status(200).send(createdGroup);
      } catch (err: any) {
        console.error(err);
        res.status(500).send({ error: err.message });
      }
    }
  };

  public update: RequestHandler = async (req, res) => {
    const { group, pools } = req.body;
    const { id } = req.params;
    console.log(id, group, pools, "ID GROUP POOLS");
    const user = await AuthService.find((req as any).auth?.sub);
    if (!id) {
      res.status(400).send({ error: "GroupId is required" });
    } else {
      try {
        const updatedGroup = await GroupsService.update(
          id,
          group,
          pools,
          user.id
        );

        if (!updatedGroup) {
          throw new Error("Group not created");
        }

        res.status(200).send({ ok: updatedGroup });
      } catch (err: any) {
        console.error(err);
        res.status(500).send({ error: err.message });
      }
    }
  };

  public findMembers: RequestHandler = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ error: "id is required" });
    } else {
      try {
        const members = await GroupsService.findMembers(id);

        if (!members) {
          res.status(404).send({ error: "group not found" });
        } else {
          res.status(200).send(members);
        }
      } catch (err: any) {
        console.log(err, 'wats err')
        res.status(500).send({ error: err.message });
      }
    }
  };

  public toggleAdminStatus: RequestHandler = async (req, res) => {
    const { groupId, userId: userIdForMember } = req.params;
    const authenticatedUser = await AuthService.find((req as any).auth?.sub);

    if (!groupId && !userIdForMember) {
      res.status(400).send({ error: "id is required" });
    } else {
      try {
        const toggled = await GroupsService.toggleAdminStatus(groupId, userIdForMember, authenticatedUser.id);
        console.log(toggled, 'wats toggled?')
        res.status(200).send(toggled);

      } catch (err: any) {
        console.log(err, 'wats err')
        res.status(500).send({ error: err.message });
      }
    }
  }
}
